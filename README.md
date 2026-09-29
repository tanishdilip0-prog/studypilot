# StudyPilot — Modern Academic AI Study Platform

A modern, responsive, and grounded web frontend for **StudyPilot**, an AI-powered academic study platform built specifically for large, dense academic PDF notes (500–1000+ pages).

Unlike generic chatbot UIs, StudyPilot focuses on **academic document grounding**: page-level citations, multi-column textbook study layouts, active recall flashcards, university exam mark structuring (5-mark & 13-mark answers), and interactive vector diagram synthesis.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v20+ recommended)
- npm or pnpm

### Quick Start
```bash
# 1. Navigate to the project directory
cd studypilot

# 2. Install dependencies (already installed if in scratch directory)
npm install

# 3. Start development server
npm run dev

# 4. Or build for production & preview
npm run build
npm run preview
```

The application will run locally at `http://localhost:5173`.

---

## 📁 Project Structure

```
studypilot/
├── public/                 # Static assets & public resources
├── src/
│   ├── components/
│   │   ├── common/         # Global reusable components
│   │   │   ├── Toast.tsx         # Floating notification toast
│   │   │   └── UploadModal.tsx   # PDF dropzone with privacy verification
│   │   ├── layout/         # Navigation & structure
│   │   │   ├── Navbar.tsx        # Top nav with responsive mobile drawer & updates
│   │   │   └── Footer.tsx        # Academic trust bar & metadata
│   │   ├── study/          # Study session components
│   │   │   ├── DocumentNavSidebar.tsx # Left column: TOC & chapter navigation
│   │   │   ├── AcademicPdfViewer.tsx  # Center: Mock PDF canvas, zoom & highlight sync
│   │   │   └── AiAnswerPanel.tsx      # Right: Grounded AI Q&A with exam mark formats
│   ├── context/
│   │   └── AppContext.tsx  # Global state: active page, documents, theme, active page #
│   ├── data/
│   │   └── mockData.ts     # Realistic academic datasets (OS, Networks, DBMS, Algorithms)
│   ├── layouts/
│   │   └── MainLayout.tsx  # Router layout coordinating all 9 pages
│   ├── pages/
│   │   ├── LandingPage.tsx    # Page 1: Hero, interactive mock preview & feature cards
│   │   ├── DashboardPage.tsx  # Page 2: Student dashboard, recent documents & continue studying
│   │   ├── DocumentsPage.tsx  # Page 3: "My Documents" library with filters, search, grid/list
│   │   ├── StudyPage.tsx      # Page 4: 3-column study & Q&A interface (Most Important)
│   │   ├── CopilotPage.tsx    # Page 5: Study Copilot tutoring with quick actions
│   │   ├── DiagramPage.tsx    # Page 6: AI Diagram Generator (TCP handshake, OS lifecycle)
│   │   ├── StudyToolsPage.tsx # Page 7: Study Tools (Summarize, Questions, Flashcards, Quiz, Exam Answer)
│   │   ├── ProcessingPage.tsx # Page 8: Neural ingestion progress screen & live checklist
│   │   └── SettingsPage.tsx   # Page 9: Student profile, AI modes, appearance & data storage
│   ├── services/           # Decoupled service layer ready for backend connection
│   │   ├── documentService.ts # Document retrieval, pagination, chunk search & upload
│   │   ├── aiService.ts       # RAG question answering, quick actions & exam formatting
│   │   └── userService.ts     # Profile and student preferences
│   ├── types/
│   │   └── index.ts        # Comprehensive TypeScript domain interfaces
│   ├── App.tsx             # Root React component
│   ├── index.css           # Modern Tailwind CSS configuration & custom typography
│   └── main.tsx            # React 19 entrypoint
├── index.html              # Shell template with academic metadata & SVG favicon
├── package.json            # Dependencies: React 19, Lucide icons, Tailwind CSS v4
├── tsconfig.app.json       # Strict TypeScript configuration
└── vite.config.ts          # Vite configuration with @tailwindcss/vite
```

---

## 🌟 The 9 Application Pages

1. **Page 1 — Landing / Welcome Page**:
   - Hero: *"Turn 1000 pages of notes into answers in seconds."*
   - Interactive live mockup of the 3-column StudyPilot interface.
   - 4 core feature cards: *Ask Your Notes*, *Find the Source*, *Study Smarter*, *AI Study Copilot*.
   - Academic credibility badges for university engineering curricula.

2. **Page 2 — Student Dashboard**:
   - Personalized header (*"Good morning, Alex 👋"*).
   - Large upload card with drag-and-drop zone and privacy note.
   - Recent documents with page counts and real-time processing indicators.
   - *"Continue Studying"* card section with recent academic topics.

3. **Page 3 — Document Library ("My Documents")**:
   - Real-time search by title, subject, or keywords.
   - Subject filtering (*Computer Systems, Networking, Data Engineering, Theory*).
   - Sorting by Recent, Name, or Page Count.
   - Grid and List toggle views.
   - Document management menu (Re-index, Generate Summary, Delete).
   - Polished empty state with upload CTA.

4. **Page 4 — PDF Study / Question Answering Interface (Core Product)**:
   - **Left Column**: Document Table of Contents with expandable chapters and page counts.
   - **Center Column**: Realistic academic PDF page view with zoom controls (- / + / Fit), prev/next page navigation, and in-document search.
   - **Right Column**: Grounded AI Answer Panel with citation chips (*"📄 Operating Systems Notes • Pages 421–424"*).
   - **Highlighter Synchronization**: Clicking any citation chip navigates the PDF viewer to that exact page and highlights the source excerpt.
   - **Exam Quick Actions**: *"Explain simpler"*, *"Give example"*, *"Make it a 5-mark answer"*, *"Make it a 13-mark answer"*.
   - **Responsive Mode**: Intelligently transforms into a tabbed layout on mobile and tablet screens.

5. **Page 5 — Study Copilot**:
   - Dedicated conversational study assistant.
   - Left side: Active document and context scope (*"Pages 510–524"*).
   - Center: Conversational chat stream with source grounding.
   - Right side: Quick study actions (*"Explain simpler"*, *"Give an analogy"*, *"Give an example"*, *"Create MCQs"*, *"Summarize"*, *"Create revision notes"*).

6. **Page 6 — AI Diagram Generator**:
   - Text prompt input to describe complex academic mechanisms.
   - Pre-generated vector diagrams (e.g. *TCP 3-Way Handshake*, *OS 5-State Process Lifecycle*, *Resource Allocation Graph Deadlock Cycle*).
   - Citation footer grounding the diagram in specific notes pages.
   - Export actions: Download SVG, Regenerate, Add to Notes.

7. **Page 7 — Study Tools Suite**:
   - 6 high-yield academic tools:
     - 📝 *Summarize Notes*
     - ❓ *Generate Questions*
     - 🧠 *Flashcards* (with interactive 3D flip card workbench)
     - 📊 *Quiz Me* (with multiple-choice scoring and explanations)
     - ✍️ *Exam Answer* (2-mark, 5-mark, 13-mark, 16-mark formatter)
     - 🖼️ *Generate Diagram*

8. **Page 8 — Processing Screen**:
   - Realistic upload and ingestion progress screen (*"Processing Operating Systems Notes • 67%"*).
   - Step-by-step pipeline checklist (*File uploaded, PDF validated, Text extracted, Sections identified, Building search index, Ready to study*).
   - Telemetry statistics: Chunks created, KaTeX formulas parsed, index latency.
   - Non-blocking notification: *"You're free to leave this page. We'll notify you when your document is ready."*

9. **Page 9 — Profile & Settings**:
   - Student profile: Name, email, university, department.
   - Study preferences: Answer style, default answer length, preferred language.
   - AI preferences: Reasoning depth (Fast Recall, Balanced, Deep Chain-of-Thought).
   - Appearance: Light / Dark theme toggle.
   - Storage governance: Document quota visualization (2.19 GB of 10 GB used) and data export.

---

## 🔌 Connecting Future Backend APIs

The frontend has been strictly decoupled from mock data through the service layer in `src/services/`. You will not need to redesign the UI or refactor component trees when adding the backend:

| Backend Component | Frontend Integration Point | Description |
| :--- | :--- | :--- |
| **PDF Upload & Storage** | [`DocumentService.uploadDocument`](file:///C:/Users/tanis/.gemini/antigravity/scratch/studypilot/src/services/documentService.ts#L69-L115) | Connect to AWS S3, Cloudflare R2, or FastAPI multipart upload. Stream upload progress to the callback. |
| **Document Processing & Chunks** | [`DocumentService.getPageContent`](file:///C:/Users/tanis/.gemini/antigravity/scratch/studypilot/src/services/documentService.ts#L29-L44) | Replace with your PDF rendering / text extraction endpoint (e.g., PyMuPDF, Unstructured.io, pdf2image). |
| **RAG Retrieval & LLM Q&A** | [`AIService.askQuestion`](file:///C:/Users/tanis/.gemini/antigravity/scratch/studypilot/src/services/aiService.ts#L17-L198) | Connect to your vector database (Pinecone, ChromaDB, PGVector) + LLM endpoint (Gemini, Claude, GPT-4o). Supports streaming via SSE/WebSocket. |
| **Quick Action Transforms** | [`AIService.executeQuickAction`](file:///C:/Users/tanis/.gemini/antigravity/scratch/studypilot/src/services/aiService.ts#L204-L350) | Connect to structured prompt chains for university mark rubrics and simpler analogies. |
| **Diagram Generator** | [`AIService.generateDiagram`](file:///C:/Users/tanis/.gemini/antigravity/scratch/studypilot/src/services/aiService.ts#L354-L368) | Connect to an LLM generating Mermaid.js or SVG specifications from course notes. |
| **Flashcards & Quiz API** | [`AIService.generateQuiz`](file:///C:/Users/tanis/.gemini/antigravity/scratch/studypilot/src/services/aiService.ts#L371-L382) | Connect to test-bank generation pipelines. |
| **User Profile & Storage Quota** | [`UserService.getProfile`](file:///C:/Users/tanis/.gemini/antigravity/scratch/studypilot/src/services/userService.ts#L4-L24) | Connect to PostgreSQL / Supabase / Firebase Auth. |

---

## 🎨 Design Philosophy & UX Standards

- **Typography**: Clean, high-legibility sans-serif for UI paired with classical academic serif for PDF text.
- **Spacing & Radius**: 8px modular spacing system, 12–16px rounded card radius.
- **Color Palette**: Deep navy & slate backgrounds (`#F8FAFC`, `#0F172A`), blue-violet primary accents (`#4F46E5`, `#6366F1`), emerald success metrics, and amber exam badges.
- **Zero Hallucination UX**: Prominently highlights page and section source chips on every response, ensuring trust in academic environments.
- **Responsive Architecture**: Intelligent breakpoint management ensures seamless usability from mobile phones to high-resolution desktop monitors.
