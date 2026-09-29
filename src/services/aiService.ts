import { ChatMessage, Citation, DiagramModel, Flashcard, QuizQuestion } from '../types';
import { mockDiagrams, mockFlashcards, mockQuizQuestions } from '../data/mockData';

/**
 * AI Service Interface
 * Designed for future plug-and-play integration with:
 * - OpenAI / Anthropic / Gemini API
 * - LangChain / LlamaIndex / RAG pipelines
 * - Custom LLM server endpoints
 */
export const AIService = {
  /**
   * Ask question about an academic PDF
   */
  async askQuestion(
    documentId: string,
    question: string,
    currentPage: number = 421
  ): Promise<ChatMessage> {
    // Realistic AI latency simulation
    await new Promise((resolve) => setTimeout(resolve, 850));

    const q = question.toLowerCase();

    // 1. Deadlock specific queries
    if (q.includes('deadlock') || q.includes('prevention') || q.includes('avoidance')) {
      return {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: `**Deadlock prevention** is a proactive system design strategy that eliminates deadlocks by ensuring that at least one of the four necessary **Coffman conditions** cannot hold:

1. **Eliminating Mutual Exclusion:**
   - Allow resources to be shared simultaneously whenever possible (e.g. read-only files).
   - *Limitation:* Physical hardware devices such as printers or mutex locks are fundamentally non-shareable.

2. **Eliminating Hold and Wait:**
   - Require processes to request and receive all resources before execution begins, or only allow requesting when holding 0 resources.
   - *Limitation:* Causes severe resource underutilization and indefinite starvation for processes requesting popular resources.

3. **Eliminating No Preemption:**
   - If a process holding resources requests another resource that is unavailable, the OS preempts and forcibly reclaims all its current resources.
   - *Limitation:* Only practical for states that can be safely saved and restored, such as CPU registers or RAM pages.

4. **Eliminating Circular Wait (Standard Practical Approach):**
   - Define a global monotonic ranking function $F: R \\to \\mathbb{N}$ across all system resources.
   - Processes are strictly restricted to request resources in monotonically increasing order ($F(R_j) > F(R_i)$), which mathematically prevents closed dependency cycles.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: [
          {
            documentId,
            documentTitle: 'Operating Systems Principles & Architecture',
            pageNumber: 421,
            pageRange: 'Pages 421–424',
            sectionTitle: 'Section 7.4 Deadlock Prevention',
            excerpt: 'By ensuring that at least one of these conditions cannot hold, we can systematically prevent the occurrence of a deadlock...',
            relevanceScore: 0.98,
          },
          {
            documentId,
            documentTitle: 'Operating Systems Principles & Architecture',
            pageNumber: 412,
            pageRange: 'Pages 412–415',
            sectionTitle: 'Section 7.1 Coffman Conditions',
            excerpt: 'Deadlock can occur if and only if all four conditions hold simultaneously in the system.',
            relevanceScore: 0.93,
          },
        ],
        quickActions: [
          'Explain simpler',
          'Give example',
          'Make it a 5-mark answer',
          'Make it a 13-mark answer',
        ],
        suggestedFollowUps: [
          'How does Deadlock Prevention differ from Banker’s Algorithm Avoidance?',
          'What is the mathematical proof that linear ordering eliminates circular wait?',
          'Show a Resource Allocation Graph example.',
        ],
      };
    }

    // 2. Virtual memory queries
    if (q.includes('virtual memory') || q.includes('paging') || q.includes('tlb') || q.includes('page fault')) {
      return {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: `**Virtual Memory** is a memory management technique implemented by the OS kernel and MMU (Memory Management Unit) that creates the abstraction of a vast, contiguous address space:

- **Demand Paging:** Pages are only loaded into physical memory frames when referenced by the CPU.
- **Page Fault Mechanism:** When a page not present in RAM is referenced (valid-invalid bit is 0), an internal hardware trap generates a page fault:
  1. Trap to kernel mode.
  2. Locate target page in backing store (swap space/disk).
  3. Find a free frame (or evict via LRU/FIFO if memory is full).
  4. Schedule disk read to copy page into frame.
  5. Update page table and reset invalid bit to valid.
  6. Restart the interrupted instruction.
- **Translation Lookaside Buffer (TLB):** An associative cache to avoid the 2-memory-access penalty per address translation.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: [
          {
            documentId,
            documentTitle: 'Operating Systems Principles & Architecture',
            pageNumber: 512,
            pageRange: 'Pages 512–525',
            sectionTitle: 'Chapter 8: Virtual Memory & Paging',
            excerpt: 'Virtual memory separates the user logical memory from physical memory, allowing an extremely large virtual memory when only smaller physical memory is available.',
            relevanceScore: 0.97,
          },
        ],
        quickActions: [
          'Explain simpler',
          'Give example',
          'Make it a 5-mark answer',
          'Make it a 13-mark answer',
        ],
        suggestedFollowUps: [
          'Calculate Effective Access Time (EAT) given a 90% TLB hit ratio.',
          'What is thrashing and how does the Working Set model resolve it?',
        ],
      };
    }

    // 3. TCP / Networking queries
    if (q.includes('tcp') || q.includes('handshake') || q.includes('network') || q.includes('syn')) {
      return {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: `**TCP Three-Way Handshake** is the connection establishment protocol used in the Transport Layer to ensure reliable, sequenced bidirectional data transfer between client and server:

1. **Step 1: SYN (Client to Server)**
   - Client sends segment with \`SYN=1\`, specifies an Initial Sequence Number ($Seq = x$), and enters state \`SYN_SENT\`.
2. **Step 2: SYN-ACK (Server to Client)**
   - Server responds with \`SYN=1\`, \`ACK=1\`, acknowledges client's sequence number ($Ack = x + 1$), specifies its own sequence number ($Seq = y$), and enters state \`SYN_RCVD\`.
3. **Step 3: ACK (Client to Server)**
   - Client acknowledges server sequence number ($Ack = y + 1$, $Seq = x + 1$) and transitions to \`ESTABLISHED\`. At this point, application payload data may be sent.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: [
          {
            documentId,
            documentTitle: 'Computer Networks: A Top-Down Approach',
            pageNumber: 212,
            pageRange: 'Pages 212–214',
            sectionTitle: 'Section 3.5.6 TCP Connection Management',
            excerpt: 'Before two processes can send data to each other, they must first perform a handshake to initialize TCP state variables.',
            relevanceScore: 0.99,
          },
        ],
        quickActions: [
          'Explain simpler',
          'Give example',
          'Make it a 5-mark answer',
          'Make it a 13-mark answer',
        ],
        suggestedFollowUps: [
          'What happens if the third ACK packet is lost?',
          'How does TCP prevent SYN flood Denial of Service attacks?',
        ],
      };
    }

    // Default Academic Fallback Response
    return {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: `Based on your uploaded course notes, here is the synthesis for **"${question}"**:

### Core Concept & Context
The topic is addressed primarily in the foundational sections of your syllabus. In academic evaluation, this concept is analyzed through formal definitions, implementation requirements, and performance trade-offs.

### Key Theoretical Points
1. **Structural Role:** It establishes the core invariant required by the system architecture to prevent invalid states.
2. **Operational Flow:** The runtime environment enforces deterministic execution boundaries to guarantee safety and liveness.
3. **Performance Trade-offs:** Optimizing for latency versus throughput introduces bounded resource consumption.

*(Note: In production mode with your live RAG vector pipeline connected, this answer will be dynamically retrieved from the exact sentence vectors in your uploaded PDF.)*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: [
        {
          documentId,
          documentTitle: 'Academic Course Material',
          pageNumber: currentPage,
          pageRange: `Page ${currentPage}`,
          sectionTitle: 'Relevant Syllabus Module',
          excerpt: `Grounded excerpt extracted from indexed document at page ${currentPage}...`,
          relevanceScore: 0.91,
        },
      ],
      quickActions: [
        'Explain simpler',
        'Give example',
        'Make it a 5-mark answer',
        'Make it a 13-mark answer',
      ],
      suggestedFollowUps: [
        'Provide a concrete real-world engineering case study.',
        'What are the typical university exam questions asked on this topic?',
      ],
    };
  },

  /**
   * Execute academic quick action transform
   */
  async executeQuickAction(
    action: string,
    topicContext: string,
    documentId: string
  ): Promise<ChatMessage> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (action.includes('simpler') || action.includes('analogy')) {
      return {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: `### 💡 Intuitive Explanation & Real-World Analogy

Imagine a narrow single-lane bridge where two cars meet head-on:

- **Deadlock** is when neither driver can move forward, and neither driver will back up.
- **Prevention** means designing the road so this situation can *never* physically happen:
  - **One-Way Rule (Denying Mutual Exclusion / Direction):** Only allow traffic in one direction.
  - **No Waiting (Denying Hold & Wait):** You aren't allowed to enter the bridge approach unless you have the green light for the entire crossing.
  - **Towing (Denying No Preemption):** If traffic stalls, a tow truck immediately picks up and relocates one car.
  - **Hierarchical Priority (Denying Circular Wait):** Higher priority vehicle numbers always have right-of-way.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: [
          {
            documentId,
            documentTitle: 'Operating Systems Principles & Architecture',
            pageNumber: 421,
            pageRange: 'Pages 421–423',
            sectionTitle: 'Deadlock Intuition & System Models',
            excerpt: 'The bridge crossing analogy illustrates circular wait and resource preemption clearly.',
          },
        ],
        quickActions: ['Make it a 5-mark answer', 'Give example', 'Create MCQs'],
      };
    }

    if (action.includes('5-mark')) {
      return {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: `### 📝 5-Mark University Exam Structured Answer

**Question:** Explain Deadlock Prevention. *(5 Marks)*

---

#### 1. Definition (1 Mark)
Deadlock prevention is a set of design-time protocols that ensure at least one of the four necessary **Coffman conditions** cannot occur, thereby making deadlock structurally impossible.

#### 2. The 4 Strategies (3 Marks)
- **Deny Mutual Exclusion:** Make resources sharable (e.g. read-only files). Inapplicable to physical devices like printers.
- **Deny Hold and Wait:** Require processes to request all resources at startup, or release held resources before making new requests.
- **Deny No Preemption:** If a held process cannot obtain an additional resource, all held resources are forcibly preempted.
- **Deny Circular Wait:** Establish a linear ordering function $F: R \\to \\mathbb{N}$. Processes must request resources strictly in increasing order.

#### 3. Primary Limitation (1 Mark)
Prevention results in severe **resource underutilization** and potential **process starvation**, which is why modern systems often prefer deadlock detection or avoidance.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        examMarks: 5,
        quickActions: ['Make it a 13-mark answer', 'Explain simpler', 'Generate Quiz'],
      };
    }

    if (action.includes('13-mark')) {
      return {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: `### 🎓 13-Mark Comprehensive University Exam Answer

**Question:** Discuss in detail Deadlock Prevention techniques. Compare prevention with avoidance and explain the implementation trade-offs. *(13 Marks)*

---

#### I. Introduction & System Model (2 Marks)
A deadlock occurs when a set of concurrent processes are permanently blocked because each process holds resources and waits for resources allocated to another process in the set.
Formally, deadlock requires all four **Coffman Conditions** to be simultaneously valid:
1. Mutual Exclusion
2. Hold and Wait
3. No Preemption
4. Circular Wait

#### II. Exhaustive Prevention Analysis (6 Marks)
1. **Invalidating Mutual Exclusion:**
   - Resources must support concurrent reads.
   - *Feasibility:* Impossible for inherently serial devices (write locks, GPU streams, disk drives).
2. **Invalidating Hold and Wait:**
   - *Protocol 1:* Conservative 2-phase resource allocation where all resources are claimed upfront.
   - *Protocol 2:* Dynamic release before acquire.
   - *Trade-off:* Drastic reduction in system concurrency and potential starvation.
3. **Invalidating No Preemption:**
   - The OS forcibly reclaims resources if immediate allocation fails.
   - *Trade-off:* Requires rollback checkpoints and complex transaction logs (viable for CPUs and RAM, but impossible for printers).
4. **Invalidating Circular Wait (Standard Solution):**
   - Define a 1-to-1 mapping $F: R \\to \\mathbb{N}$.
   - Condition: Process $P$ holding $R_i$ may request $R_j$ iff $F(R_j) > F(R_i)$.
   - *Proof by Contradiction:* If a circular wait $P_0 \\to P_1 \\to ... \\to P_n \\to P_0$ exists, then $F(R_0) < F(R_1) < ... < F(R_n) < F(R_0)$, which implies $F(R_0) < F(R_0)$—a mathematical contradiction!

#### III. Prevention vs. Avoidance vs. Detection Comparison (3 Marks)
| Metric | Deadlock Prevention | Deadlock Avoidance (Banker's) | Deadlock Detection |
| :--- | :--- | :--- | :--- |
| **Enforcement Time** | Compile / Design time | Runtime allocation checks | Periodic post-occurrence scan |
| **Resource Overhead** | High (idle resources) | Medium (state evaluation) | Low until deadlock occurs |
| **System Knowledge** | Static resource ordering | Maximum future resource claims | None beforehand |

#### IV. Conclusion (2 Marks)
While Circular Wait prevention is straightforward to implement via kernel locks, modern OS kernels rely on lock hierarchies (e.g. Linux \`lockdep\` validator) to enforce order without degrading throughput.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        examMarks: 13,
        quickActions: ['Explain simpler', 'Give example', 'Create MCQs'],
      };
    }

    // Default example
    return {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: `### 💻 Concrete Code & System Example

Here is how Linux and modern Unix kernels implement **Circular Wait Prevention** via Lock Ordering:

\`\`\`c
// Define strict lock ordering: Lock A MUST always be acquired before Lock B
pthread_mutex_t lock_A = PTHREAD_MUTEX_INITIALIZER; // Order index: 1
pthread_mutex_t lock_B = PTHREAD_MUTEX_INITIALIZER; // Order index: 2

void safe_transfer(Account *from, Account *to, double amount) {
    // Prevent deadlock by sorting pointer addresses (hierarchical ordering)
    Account *first = (from < to) ? from : to;
    Account *second = (from < to) ? to : from;

    pthread_mutex_lock(&first->mutex);
    pthread_mutex_lock(&second->mutex);

    from->balance -= amount;
    to->balance += amount;

    pthread_mutex_unlock(&second->mutex);
    pthread_mutex_unlock(&first->mutex);
}
\`\`\`

By sorting account addresses, all threads acquire locks in the exact same monotonic order, making circular wait impossible!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: ['Explain simpler', 'Make it a 5-mark answer'],
    };
  },

  /**
   * Generate an academic diagram
   */
  async generateDiagram(prompt: string, documentId?: string): Promise<DiagramModel> {
    await new Promise((resolve) => setTimeout(resolve, 950));

    const p = prompt.toLowerCase();
    if (p.includes('process') || p.includes('lifecycle') || p.includes('state')) {
      return mockDiagrams[1];
    }
    if (p.includes('deadlock') || p.includes('rag') || p.includes('graph')) {
      return mockDiagrams[2];
    }
    // Default TCP handshake
    return mockDiagrams[0];
  },

  /**
   * Generate interactive quiz questions from document
   */
  async generateQuiz(documentId: string): Promise<QuizQuestion[]> {
    await new Promise((resolve) => setTimeout(resolve, 700));
    return [...mockQuizQuestions];
  },

  /**
   * Generate active recall flashcards
   */
  async generateFlashcards(documentId: string): Promise<Flashcard[]> {
    await new Promise((resolve) => setTimeout(resolve, 700));
    return [...mockFlashcards];
  },
};
