import {
  AcademicDocument,
  PDFPageViewData,
  ChatMessage,
  DiagramModel,
  Flashcard,
  QuizQuestion,
  UserProfile,
  UserPreferences,
} from '../types';

export const mockUser: UserProfile = {
  name: 'Alex Morgan',
  email: 'alex.morgan@stanford.edu',
  university: 'Stanford University',
  degree: 'B.S. in Computer Science',
  year: 'Junior (3rd Year)',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
  storageUsedGB: 2.19,
  storageTotalGB: 10.0,
  stats: {
    documentsUploaded: 5,
    pagesIndexed: 3627,
    questionsAnswered: 142,
    studyHours: 38.5,
  },
};

export const defaultPreferences: UserPreferences = {
  answerStyle: 'academic',
  defaultAnswerLength: 'detailed',
  preferredLanguage: 'English (US)',
  aiThinkingMode: 'deep',
  citationDepth: 'strict-page',
  theme: 'light',
  showConfidenceScores: true,
  latexMathRendering: true,
};

export const mockDocuments: AcademicDocument[] = [
  {
    id: 'doc-os-842',
    title: 'Operating Systems Principles & Architecture',
    subject: 'Computer Systems',
    totalPages: 842,
    status: 'processed',
    processingProgress: 100,
    lastStudied: 'Today, 10:24 AM',
    uploadedAt: 'Sep 24, 2026',
    fileSize: '48.2 MB',
    authorOrCourse: 'CS 140 / Prof. Ousterhout',
    color: 'from-blue-600 to-indigo-700',
    description: 'Comprehensive lecture series notes and textbook extracts covering concurrency, synchronization, CPU scheduling, deadlocks, and virtual memory systems.',
    badge: 'Core Curriculum',
    chapters: [
      {
        id: 'ch-1',
        number: 1,
        title: 'Introduction & System Structures',
        pageStart: 1,
        pageEnd: 44,
        sections: [
          { id: 's1-1', title: 'What Operating Systems Do', page: 4 },
          { id: 's1-2', title: 'Computer-System Architecture', page: 18 },
          { id: 's1-3', title: 'Operating-System Operations & Dual-Mode', page: 32 },
        ],
      },
      {
        id: 'ch-2',
        number: 2,
        title: 'Processes & Process Control',
        pageStart: 45,
        pageEnd: 111,
        sections: [
          { id: 's2-1', title: 'Process Concept & PCB Anatomy', page: 48 },
          { id: 's2-2', title: 'Process Scheduling & Queues', page: 62 },
          { id: 's2-3', title: 'Operations on Processes (fork/exec)', page: 85 },
        ],
      },
      {
        id: 'ch-3',
        number: 3,
        title: 'Threads & Multicore Concurrency',
        pageStart: 112,
        pageEnd: 197,
        sections: [
          { id: 's3-1', title: 'Multithreading Models (1:1, M:1, M:N)', page: 120 },
          { id: 's3-2', title: 'Thread Libraries & Pthreads', page: 154 },
          { id: 's3-3', title: 'Implicit Threading & Thread Pools', page: 178 },
        ],
      },
      {
        id: 'ch-4',
        number: 4,
        title: 'CPU Scheduling Algorithms',
        pageStart: 198,
        pageEnd: 279,
        sections: [
          { id: 's4-1', title: 'Scheduling Criteria & Turnaround Time', page: 202 },
          { id: 's4-2', title: 'FCFS, SJF, and Round-Robin Analysis', page: 218 },
          { id: 's4-3', title: 'Multi-Level Feedback Queue (MLFQ)', page: 254 },
        ],
      },
      {
        id: 'ch-5',
        number: 5,
        title: 'Synchronization & Critical Sections',
        pageStart: 280,
        pageEnd: 409,
        sections: [
          { id: 's5-1', title: 'The Critical-Section Problem', page: 285 },
          { id: 's5-2', title: 'Peterson’s Solution & Hardware Instructions', page: 312 },
          { id: 's5-3', title: 'Semaphores, Mutexes, and Monitors', page: 348 },
        ],
      },
      {
        id: 'ch-6',
        number: 6,
        title: 'Deadlocks: Theory & Prevention',
        pageStart: 410,
        pageEnd: 484,
        sections: [
          { id: 's6-1', title: 'System Model & Necessary Conditions', page: 412 },
          { id: 's6-2', title: 'Resource-Allocation Graph (RAG)', page: 418 },
          { id: 's6-3', title: 'Deadlock Prevention Strategies', page: 421 },
          { id: 's6-4', title: 'Deadlock Avoidance & Banker’s Algorithm', page: 435 },
          { id: 's6-5', title: 'Deadlock Detection and Recovery', page: 462 },
        ],
      },
      {
        id: 'ch-7',
        number: 7,
        title: 'Main Memory & Paging Architectures',
        pageStart: 485,
        pageEnd: 559,
        sections: [
          { id: 's7-1', title: 'Address Binding & Dynamic Relocation', page: 488 },
          { id: 's7-2', title: 'Contiguous Memory Allocation', page: 502 },
          { id: 's7-3', title: 'Paging Hardware & Page Tables', page: 518 },
        ],
      },
      {
        id: 'ch-8',
        number: 8,
        title: 'Virtual Memory & Page Replacement',
        pageStart: 560,
        pageEnd: 679,
        sections: [
          { id: 's8-1', title: 'Demand Paging & Page Fault Routine', page: 564 },
          { id: 's8-2', title: 'Page Replacement Algorithms (FIFO, LRU, Optimal)', page: 592 },
          { id: 's8-3', title: 'Thrashing & Working-Set Model', page: 640 },
        ],
      },
      {
        id: 'ch-9',
        number: 9,
        title: 'Storage & File-System Implementation',
        pageStart: 680,
        pageEnd: 842,
        sections: [
          { id: 's9-1', title: 'File Concept & Directory Structures', page: 685 },
          { id: 's9-2', title: 'Inode Architecture & Block Allocation', page: 724 },
          { id: 's9-3', title: 'NFS & Journaling File Systems', page: 789 },
        ],
      },
    ],
  },
  {
    id: 'doc-cn-624',
    title: 'Computer Networks: A Top-Down Approach',
    subject: 'Networking & Telecommunications',
    totalPages: 624,
    status: 'processing',
    processingProgress: 68,
    lastStudied: 'Yesterday, 4:15 PM',
    uploadedAt: 'Sep 28, 2026',
    fileSize: '34.8 MB',
    authorOrCourse: 'CS 144 / Prof. McKeown',
    color: 'from-emerald-600 to-teal-700',
    description: 'Protocol stack reference, covering transport layer reliability, TCP sliding window, congestion control, BGP routing, and socket programming.',
    badge: 'Processing Index',
    chapters: [
      { id: 'cn-1', number: 1, title: 'Computer Networks and the Internet', pageStart: 1, pageEnd: 78 },
      { id: 'cn-2', number: 2, title: 'Application Layer (HTTP, DNS, TLS)', pageStart: 79, pageEnd: 172 },
      { id: 'cn-3', number: 3, title: 'Transport Layer Protocols & TCP', pageStart: 173, pageEnd: 298 },
      { id: 'cn-4', number: 4, title: 'Network Layer: Data Plane', pageStart: 299, pageEnd: 418 },
      { id: 'cn-5', number: 5, title: 'Network Layer: Control Plane (BGP/OSPF)', pageStart: 419, pageEnd: 512 },
      { id: 'cn-6', number: 6, title: 'Link Layer & Local Area Networks', pageStart: 513, pageEnd: 624 },
    ],
  },
  {
    id: 'doc-dbms-731',
    title: 'Database Management Systems & SQL Internals',
    subject: 'Data Engineering',
    totalPages: 731,
    status: 'processed',
    processingProgress: 100,
    lastStudied: '3 days ago',
    uploadedAt: 'Sep 21, 2026',
    fileSize: '52.1 MB',
    authorOrCourse: 'CS 145 / Prof. Widom',
    color: 'from-violet-600 to-purple-800',
    description: 'Relational algebra, normal forms (1NF through BCNF), B+ Tree page organization, write-ahead logging (ARIES), and two-phase locking (2PL).',
    chapters: [
      { id: 'db-1', number: 1, title: 'The Relational Model & Relational Algebra', pageStart: 1, pageEnd: 92 },
      { id: 'db-2', number: 2, title: 'Advanced SQL & Schema Constraints', pageStart: 93, pageEnd: 188 },
      { id: 'db-3', number: 3, title: 'Storage & B+ Tree Index Structures', pageStart: 189, pageEnd: 320 },
      { id: 'db-4', number: 4, title: 'Query Execution & Cost-Based Optimizer', pageStart: 321, pageEnd: 460 },
      { id: 'db-5', number: 5, title: 'Transactions, ACID Properties, & 2PL', pageStart: 461, pageEnd: 590 },
      { id: 'db-6', number: 6, title: 'Crash Recovery, ARIES & WAL Protocol', pageStart: 591, pageEnd: 731 },
    ],
  },
  {
    id: 'doc-algo-918',
    title: 'Introduction to Algorithms (CLRS Core Notes)',
    subject: 'Theory of Computation',
    totalPages: 918,
    status: 'processed',
    processingProgress: 100,
    lastStudied: '1 week ago',
    uploadedAt: 'Sep 14, 2026',
    fileSize: '68.4 MB',
    authorOrCourse: 'CS 161 / Theory Group',
    color: 'from-amber-600 to-orange-700',
    description: 'Asymptotic notation, divide-and-conquer, dynamic programming matrix chain multiplications, greedy matroid theory, and graph minimum spanning trees.',
    chapters: [
      { id: 'al-1', number: 1, title: 'Foundations & Asymptotic Growth', pageStart: 1, pageEnd: 84 },
      { id: 'al-2', number: 2, title: 'Sorting & Order Statistics', pageStart: 85, pageEnd: 215 },
      { id: 'al-3', number: 3, title: 'Data Structures: Red-Black Trees & Heaps', pageStart: 216, pageEnd: 370 },
      { id: 'al-4', number: 4, title: 'Dynamic Programming & Memoization', pageStart: 371, pageEnd: 512 },
      { id: 'al-5', number: 5, title: 'Graph Algorithms: Shortest Paths & Flows', pageStart: 513, pageEnd: 740 },
      { id: 'al-6', number: 6, title: 'NP-Completeness & Approximation', pageStart: 741, pageEnd: 918 },
    ],
  },
  {
    id: 'doc-dist-512',
    title: 'Distributed Systems: Fault-Tolerance & Consensus',
    subject: 'Computer Systems',
    totalPages: 512,
    status: 'processed',
    processingProgress: 100,
    lastStudied: '2 weeks ago',
    uploadedAt: 'Sep 08, 2026',
    fileSize: '29.7 MB',
    authorOrCourse: 'CS 244B / Distributed Lab',
    color: 'from-rose-600 to-pink-700',
    description: 'Vector clocks, state-machine replication, Raft & Paxos consensus algorithms, Byzantine fault tolerance, and Dynamo-style eventual consistency.',
    chapters: [
      { id: 'ds-1', number: 1, title: 'Time, Clocks, and Global State', pageStart: 1, pageEnd: 96 },
      { id: 'ds-2', number: 2, title: 'Coordination and Agreement', pageStart: 97, pageEnd: 198 },
      { id: 'ds-3', number: 3, title: 'Consensus: Paxos and Raft Protocols', pageStart: 199, pageEnd: 334 },
      { id: 'ds-4', number: 4, title: 'Distributed Storage & Consistency Models', pageStart: 335, pageEnd: 512 },
    ],
  },
];

export const mockPage421Content: PDFPageViewData = {
  pageNumber: 421,
  totalDocumentPages: 842,
  chapterNumber: 6,
  chapterTitle: 'Deadlocks',
  sectionNumber: '7.4',
  sectionTitle: 'Deadlock Prevention',
  heading: '7.4 Deadlock Prevention',
  bodyParagraphs: [
    'As we noted in Section 7.2, a deadlock situation can arise if and only if all four of the Coffman conditions hold simultaneously: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. By ensuring that at least one of these conditions cannot hold, we can systematically prevent the occurrence of a deadlock.',
    '1. Mutual Exclusion: The mutual-exclusion condition must hold for non-shareable resources. For example, a printer cannot be simultaneously shared by several processes. Sharable resources (such as read-only files), on the other hand, do not require mutually exclusive access and thus cannot be involved in a deadlock. In general, however, we cannot prevent deadlocks by denying the mutual-exclusion condition, because some resources are intrinsically non-shareable.',
    '2. Hold and Wait: To ensure that the hold-and-wait condition never occurs in the system, we must guarantee that whenever a process requests a resource, it does not hold any other resources. One protocol requires each process to request and be allocated all its resources before execution begins. An alternative protocol allows a process to request resources only when it has none. Although these protocols prevent deadlocks, they suffer from two major disadvantages: resource utilization may be very low, and starvation is possible for processes needing popular resources.',
    '3. No Preemption: The third condition specifies that there be no preemption of resources that have already been allocated. If a process holding some resources requests another resource that cannot be immediately allocated, then all resources currently being held are preempted. The preempted resources are added to the list of resources for which the process is waiting.',
    '4. Circular Wait: The fourth and most practical condition to deny is the circular-wait condition. We can ensure this by imposing a total ordering on all resource types: let R = {R1, R2, ..., Rm} and define a one-to-one function F: R -> N that maps each resource type to an integer. Every process can request resources only in strictly increasing order of enumeration.',
  ],
  highlightText: 'Deadlock prevention is a set of techniques used to ensure that at least one of the necessary conditions for deadlock cannot occur. By systematically invalidating Mutual Exclusion, Hold and Wait, No Preemption, or Circular Wait, the system guarantees deadlock freedom.',
  keyTerms: [
    { term: 'Coffman Conditions', definition: 'The 4 simultaneous criteria required for deadlock: Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait.' },
    { term: 'Total Resource Ordering', definition: 'Assigning a global monotonic integer index to all system resources to prevent circular wait cycles.' },
  ],
  tableOrFigure: {
    type: 'table',
    caption: 'Table 7.1: Deadlock Prevention Trade-offs & Overhead',
    content: 'Condition Denied | Implementation Technique | Primary Disadvantage\nMutual Exclusion | Spooling / Virtualization | Inapplicable to inherently physical devices\nHold and Wait | Pre-allocation or Release-before-Request | Low resource utilization, starvation\nNo Preemption | Force release on blocked request | Complex state saving, cascading rollbacks\nCircular Wait | Strict hierarchical resource ordering | Inconvenient programming constraints',
  },
};

export const mockPage512Content: PDFPageViewData = {
  pageNumber: 512,
  totalDocumentPages: 842,
  chapterNumber: 7,
  chapterTitle: 'Main Memory & Paging',
  sectionNumber: '8.3',
  sectionTitle: 'Paging Hardware & Address Translation',
  heading: '8.3 Paging Hardware with Translation Lookaside Buffer (TLB)',
  bodyParagraphs: [
    'Every address generated by the CPU is divided into two parts: a page number (p) and a page offset (d). The page number is used as an index into a per-process page table.',
    'The page table contains the base address of each page in physical memory (the frame number f). This base address is combined with the page offset to define the physical memory address that is sent to the memory unit.',
    'Because standard page table lookup requires two memory accesses (one to read the page-table entry and one for the actual operand), hardware designers incorporate a Translation Lookaside Buffer (TLB). The TLB is high-speed associative hardware cache. If the page number is found in the TLB (TLB hit), the frame number is immediately available with zero memory-bus latency.',
  ],
  highlightText: 'A Translation Lookaside Buffer (TLB) is an associative, high-speed cache memory used by the MMU to reduce virtual-to-physical address translation penalties from two memory accesses to a single cycle on hits.',
  keyTerms: [
    { term: 'TLB Hit Ratio', definition: 'The percentage of times that a particular page number is found in the Translation Lookaside Buffer.' },
    { term: 'Effective Access Time (EAT)', definition: 'EAT = (Hit Ratio * TLB Access Time) + ((1 - Hit Ratio) * Memory Overhead).' },
  ],
};

export const mockInitialStudyChat: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'user',
    content: 'What is deadlock prevention?',
    timestamp: '10:24 AM',
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content: `**Deadlock prevention** is a proactive operating system design strategy that guarantees deadlocks can never occur by mathematically invalidating at least one of the four necessary **Coffman conditions**:

1. **Denying Mutual Exclusion:**
   - Make resources shareable wherever possible (e.g., read-only memory files).
   - *Limitation:* Inherently dedicated physical devices (printers, tape drives, write mutexes) cannot be safely shared.

2. **Denying Hold and Wait:**
   - **Protocol A:** Processes must request and receive *all* needed resources at program launch before beginning execution.
   - **Protocol B:** A process can only request new resources when it currently holds zero resources.
   - *Limitation:* Leads to severe resource underutilization and potential starvation.

3. **Denying No Preemption:**
   - If Process $P_1$ holds Resource $R_1$ and requests $R_2$ which is currently unavailable, $R_1$ is forcibly preempted from $P_1$.
   - *Limitation:* Applicable only to resources whose execution state can be easily checkpointed and restored (e.g., CPU registers and physical memory frames).

4. **Denying Circular Wait (Most Common & Practical):**
   - Impose a strict global linear ordering function $F: R \rightarrow \mathbb{N}$ across all resources.
   - A process holding resource $R_i$ can only request $R_j$ if $F(R_j) > F(R_i)$. This mathematically eliminates directed cycles in the Resource Allocation Graph.`,
    timestamp: '10:24 AM',
    citations: [
      {
        documentId: 'doc-os-842',
        documentTitle: 'Operating Systems Principles & Architecture',
        pageNumber: 421,
        pageRange: 'Pages 421–424',
        sectionTitle: 'Section 7.4 Deadlock Prevention',
        excerpt: 'By ensuring that at least one of these conditions cannot hold, we can systematically prevent the occurrence of a deadlock...',
        relevanceScore: 0.98,
      },
      {
        documentId: 'doc-os-842',
        documentTitle: 'Operating Systems Principles & Architecture',
        pageNumber: 412,
        pageRange: 'Pages 412–415',
        sectionTitle: 'Section 7.1 Necessary Coffman Conditions',
        excerpt: 'A deadlock situation can arise if and only if all four conditions hold simultaneously...',
        relevanceScore: 0.94,
      },
    ],
    quickActions: [
      'Explain simpler',
      'Give example',
      'Make it a 5-mark answer',
      'Make it a 13-mark answer',
    ],
    suggestedFollowUps: [
      'How does Deadlock Prevention differ from Deadlock Avoidance?',
      'Can you show a numerical example of Banker’s Algorithm safety check?',
      'Why is denying Circular Wait preferred over denying Hold and Wait?',
    ],
  },
];

export const mockCopilotChat: ChatMessage[] = [
  {
    id: 'copilot-1',
    role: 'user',
    content: 'Explain virtual memory in simple words.',
    timestamp: '11:05 AM',
  },
  {
    id: 'copilot-2',
    role: 'assistant',
    content: `Think of **virtual memory** like a chef's small prep counter compared to a huge pantry in the back:

- **RAM (Physical Memory)** is your **prep counter** — fast, within arms reach, but strictly limited in surface area (e.g., 16 GB).
- **Secondary Storage (SSD/Disk)** is your **giant walk-in pantry** — huge capacity (e.g., 1,000 GB), but walking to fetch ingredients takes longer.
- **Virtual Memory** is the illusion that your prep counter is infinitely large. Running applications don't need to fit entirely into RAM. The OS automatically brings only the active recipes (pages) onto the counter when needed, and quietly puts inactive ones back onto the pantry shelves (swapping/paging).

### Key Takeaway for Your Exam:
It separates the **logical address space** seen by the programmer from the **physical address space** managed by the machine hardware.`,
    timestamp: '11:05 AM',
    citations: [
      {
        documentId: 'doc-os-842',
        documentTitle: 'Operating Systems Principles & Architecture',
        pageNumber: 560,
        pageRange: 'Pages 560–564',
        sectionTitle: 'Chapter 8: Virtual Memory & Demand Paging',
        excerpt: 'Virtual memory is a technique that allows the execution of processes that are not completely in memory...',
        relevanceScore: 0.96,
      },
    ],
    quickActions: [
      'Explain simpler',
      'Give an analogy',
      'Give an example',
      'Create MCQs',
      'Summarize',
      'Create revision notes',
    ],
    suggestedFollowUps: [
      'What happens during a Page Fault step-by-step?',
      'How does the TLB speed up address translation?',
      'Explain thrashing and the working set model.',
    ],
  },
];

export const mockDiagrams: DiagramModel[] = [
  {
    id: 'diag-tcp-handshake',
    title: 'TCP Three-Way Handshake Connection Establishment',
    concept: 'Explain the TCP three-way handshake.',
    type: 'sequence',
    sourceDocument: 'Computer Networks: A Top-Down Approach',
    sourcePages: 'Pages 212–214',
    description: 'Detailed sequence flow showing SYN, SYN-ACK, and ACK transmissions, sequence number synchronization, and socket state transitions (LISTEN, SYN_SENT, SYN_RCVD, ESTABLISHED).',
    confidence: 99.4,
    steps: [
      {
        step: 1,
        from: 'Client Host (Port 54321)',
        to: 'Server Host (Port 443)',
        label: 'SYN Packet',
        flag: 'SYN=1, Seq=x',
        description: 'Client chooses random initial sequence number x, enters SYN_SENT state.',
        status: 'complete',
      },
      {
        step: 2,
        from: 'Server Host (Port 443)',
        to: 'Client Host (Port 54321)',
        label: 'SYN + ACK Packet',
        flag: 'SYN=1, ACK=1, Seq=y, Ack=x+1',
        description: 'Server allocates buffers, chooses seq y, acknowledges x, enters SYN_RCVD state.',
        status: 'complete',
      },
      {
        step: 3,
        from: 'Client Host (Port 54321)',
        to: 'Server Host (Port 443)',
        label: 'ACK Packet (Data Allowed)',
        flag: 'ACK=1, Seq=x+1, Ack=y+1',
        description: 'Client acknowledges server seq y, enters ESTABLISHED state. Both ends ready.',
        status: 'active',
      },
    ],
  },
  {
    id: 'diag-os-process',
    title: 'Operating System 5-State Process Lifecycle',
    concept: 'Operating system process state transitions and schedulers.',
    type: 'lifecycle',
    sourceDocument: 'Operating Systems Principles & Architecture',
    sourcePages: 'Pages 48–52',
    description: 'Visualizing New, Ready, Running, Waiting (Blocked), and Terminated process execution stages.',
    confidence: 98.7,
    nodes: [
      { id: 'new', label: 'NEW', sub: 'Process created, PCB allocated', state: 'init' },
      { id: 'ready', label: 'READY', sub: 'In memory, awaiting CPU dispatch', state: 'queue' },
      { id: 'running', label: 'RUNNING', sub: 'Instructions executing on CPU', state: 'active' },
      { id: 'waiting', label: 'WAITING', sub: 'Blocked on I/O or event completion', state: 'blocked' },
      { id: 'terminated', label: 'TERMINATED', sub: 'Execution halted, resources reclaimed', state: 'exit' },
    ],
  },
  {
    id: 'diag-deadlock-rag',
    title: 'Resource Allocation Graph (RAG) Deadlock Cycle',
    concept: 'Deadlock detection with Resource Allocation Graph.',
    type: 'flow',
    sourceDocument: 'Operating Systems Principles & Architecture',
    sourcePages: 'Pages 418–420',
    description: 'Circular dependency graph between Process P1, Process P2, Resource R1 (Tape Drive), and Resource R2 (Printer).',
    confidence: 99.1,
    steps: [
      { step: 1, from: 'Process P1', to: 'Resource R2', label: 'Request Edge', description: 'P1 is waiting for exclusive assignment of R2.' },
      { step: 2, from: 'Resource R2', to: 'Process P2', label: 'Assignment Edge', description: 'R2 is currently held exclusively by P2.' },
      { step: 3, from: 'Process P2', to: 'Resource R1', label: 'Request Edge', description: 'P2 is waiting for allocation of R1.' },
      { step: 4, from: 'Resource R1', to: 'Process P1', label: 'Assignment Edge', description: 'R1 is currently held exclusively by P1.' },
    ],
  },
];

export const mockQuizQuestions: QuizQuestion[] = [
  {
    id: 'q-1',
    question: 'Which of the following Coffman conditions is most practical to eliminate in real-world systems to prevent deadlocks?',
    options: [
      'Mutual Exclusion by virtualizing all physical hardware',
      'Hold and Wait by terminating processes upon new requests',
      'Circular Wait by establishing a global monotonic resource ordering',
      'No Preemption by continuously killing non-responding processes',
    ],
    correctIndex: 2,
    explanation: 'Circular Wait is the most widely adopted condition to invalidate in practice because assigning hierarchical integer IDs (F: R -> N) requires zero runtime process preemption or resource wasting.',
    sourcePage: 421,
    topic: 'Deadlock Prevention',
  },
  {
    id: 'q-2',
    question: 'In demand paging, what hardware mechanism triggers the OS when an unmapped page table entry is referenced?',
    options: [
      'A TLB miss interrupt',
      'A page fault trap exception',
      'A direct memory access DMA interrupt',
      'A context switch yield signal',
    ],
    correctIndex: 1,
    explanation: 'When the invalid bit is detected in a page table entry during address translation, the MMU hardware issues a page fault trap to the OS kernel.',
    sourcePage: 564,
    topic: 'Virtual Memory',
  },
  {
    id: 'q-3',
    question: 'What is the primary role of the ACK packet in the third leg of the TCP three-way handshake?',
    options: [
      'To request the server to send an immediate FIN packet',
      'To confirm receipt of server sequence number and establish bi-directional sync',
      'To renegotiate the Maximum Transmission Unit (MTU) size',
      'To shut down half of the duplex connection socket',
    ],
    correctIndex: 1,
    explanation: 'The final ACK acknowledges the server sequence number (Ack = y + 1) and transitions the connection into the ESTABLISHED state, allowing payload data.',
    sourcePage: 213,
    topic: 'Transport Protocols',
  },
];

export const mockFlashcards: Flashcard[] = [
  {
    id: 'fc-1',
    front: 'What are the 4 Coffman Conditions required simultaneously for Deadlock?',
    back: '1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait',
    topic: 'Operating Systems',
    sourcePage: 412,
    difficulty: 'Easy',
  },
  {
    id: 'fc-2',
    front: 'Explain the difference between Deadlock Prevention and Deadlock Avoidance.',
    back: 'Prevention ensures at least ONE of the 4 Coffman conditions is structurally impossible at design-time. Avoidance dynamically tracks resource state at runtime (e.g. Banker’s Algorithm) to ensure the system never enters an unsafe state.',
    topic: 'Operating Systems',
    sourcePage: 435,
    difficulty: 'Medium',
  },
  {
    id: 'fc-3',
    front: 'What causes Thrashing in a Virtual Memory system?',
    back: 'When the sum of the working sets of all active processes exceeds available physical RAM frames. The OS spends more CPU time servicing page faults and swapping than executing user instructions.',
    topic: 'Virtual Memory',
    sourcePage: 640,
    difficulty: 'Hard',
  },
];

export const mockRecentTopics = [
  {
    id: 'rec-1',
    title: 'Deadlock Prevention vs Avoidance',
    subject: 'Operating Systems',
    lastQueried: '2 hours ago',
    documentTitle: 'Operating Systems Notes',
    pages: 'pp. 421–435',
  },
  {
    id: 'rec-2',
    title: 'TCP 3-Way Handshake & Sequence Numbers',
    subject: 'Computer Networks',
    lastQueried: 'Yesterday',
    documentTitle: 'Computer Networks Notes',
    pages: 'pp. 212–215',
  },
  {
    id: 'rec-3',
    title: 'B+ Tree Splitting & Interior Node Pointers',
    subject: 'Database Management Systems',
    lastQueried: '3 days ago',
    documentTitle: 'Database Systems Notes',
    pages: 'pp. 195–204',
  },
  {
    id: 'rec-4',
    title: 'Paging Hardware & TLB Hit Ratio Formulas',
    subject: 'Operating Systems',
    lastQueried: '4 days ago',
    documentTitle: 'Operating Systems Notes',
    pages: 'pp. 512–518',
  },
];
