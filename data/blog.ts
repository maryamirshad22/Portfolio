import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "building-my-first-mcp-server",
    title: "Building My First MCP Server",
    excerpt:
      "Notes on writing a Model Context Protocol server from scratch — what actually tripped me up.",
    date: "Jul 2026",
    readTime: "6 min read",
    tag: "AI Engineering",
    content: [
      {
        type: "p",
        text: "When I first read the Model Context Protocol spec, it looked deceptively simple: expose some tools, let an LLM call them, done. It took building an actual server for real work to see where the interesting problems live — not in the wire format, but in how you describe your tools and how you handle everything that can go wrong mid-call.",
      },
      { type: "h2", text: "Starting with the wrong abstraction" },
      {
        type: "p",
        text: "My first instinct was to treat MCP tools like REST endpoints — one function per resource, thin wrappers around existing API calls. That worked for the demo, but it fell apart the moment an agent tried to chain calls together. A tool that returns a raw database row is technically correct and practically useless to a model trying to decide what to do next.",
      },
      {
        type: "p",
        text: "The fix was to design tools around intent rather than data access. Instead of get_document(id), I ended up with search_documents(query) and read_document_section(id, section) — tools shaped around the questions an agent actually asks, with descriptions written for a model to read, not a developer.",
      },
      { type: "h2", text: "Schemas are documentation, not just validation" },
      {
        type: "p",
        text: "It's tempting to treat a tool's input schema as a formality you fill in after the function works. In practice, the schema is the only thing the model sees before deciding to call your tool — vague field names and missing descriptions translate directly into bad tool calls.",
      },
      {
        type: "code",
        lang: "python",
        text: `@server.tool()
async def search_documents(query: str, max_results: int = 5) -> list[dict]:
    """Search indexed documents by keyword and return the top matches.

    Use this before read_document_section when you don't yet know
    which document contains the answer.
    """
    ...`,
      },
      {
        type: "p",
        text: "That docstring is doing real work — it tells the model when to reach for this tool versus another one. I rewrote my schemas three or four times before agent behavior stopped feeling random.",
      },
      { type: "h2", text: "Partial failure is the default case" },
      {
        type: "p",
        text: "A tool call can fail after it's already had a side effect, time out with an unknown outcome, or return something the model can't parse. I initially let unhandled exceptions bubble straight into the transport layer, which meant one bad call would silently end the whole session.",
      },
      {
        type: "list",
        items: [
          "Every tool now returns a structured result, even on failure, so the model can reason about what happened instead of getting a stack trace",
          "Idempotent tool design where possible, so a retried call doesn't double-book a resource",
          "Timeouts set deliberately per tool rather than relying on a global default",
        ],
      },
      { type: "h2", text: "What I'd tell myself before starting" },
      {
        type: "p",
        text: "Build the tool descriptions first, in plain English, before writing any implementation. If you can't explain to a person when a tool should be used and what it returns, an LLM won't reliably figure it out either. The protocol itself is the easy part — the design discipline around it is where the real engineering is.",
      },
    ],
  },
  {
    slug: "django-ninja-vs-drf-for-small-apis",
    title: "Django Ninja vs DRF for Small APIs",
    excerpt:
      "A practical comparison based on shipping both in production, not just reading the docs.",
    date: "May 2026",
    readTime: "5 min read",
    tag: "Backend",
    content: [
      {
        type: "p",
        text: "Django REST Framework was my default for backend APIs for a long time — it's mature, well-documented, and there's a StackOverflow answer for almost anything you hit. But after shipping a smaller service with Django Ninja, I've started reaching for it first on new projects, and it's worth being specific about why.",
      },
      { type: "h2", text: "Type hints instead of serializer classes" },
      {
        type: "p",
        text: "DRF serializers are powerful but verbose — a simple endpoint often means a serializer class, a view class, and a URL entry before you've written any real logic. Django Ninja leans on Python type hints and Pydantic models instead, so the same endpoint reads much closer to a plain function.",
      },
      {
        type: "code",
        lang: "python",
        text: `@api.post("/projects", response=ProjectOut)
def create_project(request, payload: ProjectIn):
    project = Project.objects.create(**payload.dict())
    return project`,
      },
      {
        type: "p",
        text: "For small, CRUD-heavy services, this cut a noticeable amount of boilerplate. The type hints double as request validation and as the source for auto-generated OpenAPI docs, so I stopped maintaining schema definitions in two places.",
      },
      { type: "h2", text: "Where DRF still wins" },
      {
        type: "list",
        items: [
          "Permission and throttling ecosystem — DRF's built-in classes and third-party packages cover more edge cases out of the box",
          "Browsable API — genuinely useful during development for manually poking endpoints without a separate client",
          "Team familiarity — if a team already knows DRF deeply, the migration cost isn't always worth the boilerplate savings",
          "Larger, more mature plugin ecosystem for things like filtering and pagination customization",
        ],
      },
      { type: "h2", text: "Where Django Ninja won for my project" },
      {
        type: "p",
        text: "My use case was a small analytics ingestion API — a handful of endpoints, tight latency requirements, and a team of one. Django Ninja's async support was the deciding factor: defining async def view functions that await database calls gave a meaningful throughput improvement under load testing, without reaching for a separate ASGI framework.",
      },
      {
        type: "p",
        text: "The automatic OpenAPI/Swagger docs also meant I never had to hand-write API documentation — it stayed accurate because it was generated from the same type hints enforcing validation.",
      },
      { type: "h2", text: "The actual takeaway" },
      {
        type: "p",
        text: "This isn't a case of one framework being objectively better. DRF is the safer default for larger teams and APIs with complex permission logic. Django Ninja is what I now reach for when I want a small, async-friendly API with minimal ceremony — which, for solo and small-team projects, is most of what I build.",
      },
    ],
  },
];
