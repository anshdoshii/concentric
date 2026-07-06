export type CareerGoal = 'cloud-devops' | 'frontend' | 'data-analytics';

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface Module {
  id: string;
  title: string;
  summary: string;
  content: string[];
}

export interface Course {
  id: string;
  goal: CareerGoal;
  title: string;
  tags: string[];
  durationWeeks: number;
  description: string;
  matchReasons: string[];
  modules: Module[];
  quiz: QuizQuestion[];
}

export const COURSES: Course[] = [
  {
    id: 'cloud-devops',
    goal: 'cloud-devops',
    title: 'Full-Stack Cloud Engineering',
    tags: ['AWS', 'Kubernetes', 'CI/CD'],
    durationWeeks: 14,
    description:
      'Deploy and operate production infrastructure — from containerizing an app to running it behind a load balancer with automated rollouts.',
    matchReasons: [
      'Strong fit for infrastructure-heavy roles',
      'Matches your stated weekly availability',
      'Highest placement rate in your target track',
    ],
    modules: [
      {
        id: 'intro',
        title: 'Intro to Cloud Architecture',
        summary: 'Compute, storage, and networking primitives on a modern cloud provider.',
        content: [
          'Virtual machines vs. containers vs. serverless — when to use each',
          'Object storage, block storage, and their cost/performance tradeoffs',
          'VPCs, subnets, and how traffic actually reaches your service',
        ],
      },
      {
        id: 'networking',
        title: 'Networking Fundamentals',
        summary: 'Load balancers, DNS, and secure traffic routing between services.',
        content: [
          'Public vs. private subnets and NAT gateways',
          'Load balancer types and health checks',
          'TLS termination and certificate management',
        ],
      },
      {
        id: 'iam',
        title: 'IAM & Roles',
        summary: 'Identity and access management without long-lived credentials.',
        content: [
          'Why roles beat static access keys',
          'Least-privilege policy design',
          'Cross-service permission boundaries',
        ],
      },
      {
        id: 'deploy',
        title: 'CI/CD & Deployment',
        summary: 'Automated build, test, and rollout pipelines.',
        content: [
          'Pipeline stages: build, test, deploy, verify',
          'Blue/green and canary rollout strategies',
          'Rolling back safely when a deploy fails',
        ],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'Why are IAM roles generally preferred over static access keys?',
        options: [
          'They are easier to type',
          'They are temporary, scoped, and rotate automatically',
          'They work without any permissions',
          'They are required by all cloud providers',
        ],
        correctIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'What is the primary purpose of a load balancer?',
        options: [
          'Encrypt data at rest',
          'Store application logs',
          'Distribute incoming traffic across healthy instances',
          'Compile application code',
        ],
        correctIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'A canary deployment is best described as:',
        options: [
          'Deploying to 100% of traffic immediately',
          'Rolling back automatically on any error',
          'Gradually shifting a small percentage of traffic to the new version first',
          'Running two completely separate applications',
        ],
        correctIndex: 2,
      },
      {
        id: 'q4',
        prompt: 'Which subnet type should a public-facing load balancer typically sit in?',
        options: ['Private subnet', 'Public subnet', 'No subnet needed', 'Database subnet'],
        correctIndex: 1,
      },
      {
        id: 'q5',
        prompt: 'The principle of "least privilege" means:',
        options: [
          'Granting admin access to everyone for simplicity',
          'Granting only the permissions strictly needed for a task',
          'Never granting any permissions',
          'Granting permissions based on seniority',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'frontend',
    goal: 'frontend',
    title: 'Frontend Engineering with React',
    tags: ['React', 'TypeScript', 'Accessibility'],
    durationWeeks: 12,
    description:
      'Build production-grade interfaces — component architecture, state management, and shipping accessible, performant UI.',
    matchReasons: [
      'Strong fit for product-focused engineering roles',
      'Matches your stated weekly availability',
      'Fast-growing hiring demand in your target track',
    ],
    modules: [
      {
        id: 'components',
        title: 'Component Architecture',
        summary: 'Composable, reusable UI without prop-drilling chaos.',
        content: [
          'Container vs. presentational components',
          'Composition over configuration',
          'When to reach for context vs. props',
        ],
      },
      {
        id: 'state',
        title: 'State Management',
        summary: 'Local state, derived state, and when you actually need a store.',
        content: [
          'useState vs. useReducer vs. external stores',
          'Avoiding unnecessary re-renders',
          'Server state vs. client state',
        ],
      },
      {
        id: 'a11y',
        title: 'Accessibility Fundamentals',
        summary: 'Building interfaces that work for every user.',
        content: [
          'Semantic HTML as the accessibility baseline',
          'Keyboard navigation and focus management',
          'ARIA — when it helps and when it hurts',
        ],
      },
      {
        id: 'perf',
        title: 'Performance & Shipping',
        summary: 'Bundle size, rendering performance, and deployment.',
        content: [
          'Code splitting and lazy loading',
          'Memoization: when it helps, when it is noise',
          'Core Web Vitals and what actually moves them',
        ],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'What is the main risk of excessive prop-drilling?',
        options: [
          'Faster render times',
          'Components become tightly coupled and hard to reuse',
          'It improves accessibility',
          'It reduces bundle size',
        ],
        correctIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'Semantic HTML matters for accessibility because:',
        options: [
          'It makes CSS easier to write',
          'Screen readers and assistive tech rely on meaningful element roles',
          'It is required by all browsers',
          'It improves SEO only',
        ],
        correctIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'Code splitting primarily helps with:',
        options: [
          'Reducing initial bundle size and load time',
          'Improving accessibility',
          'Simplifying state management',
          'Avoiding the need for tests',
        ],
        correctIndex: 0,
      },
      {
        id: 'q4',
        prompt: 'When should you reach for useReducer over useState?',
        options: [
          'Always, regardless of complexity',
          'Never, useState is always sufficient',
          'When state transitions are complex or interdependent',
          'Only for server state',
        ],
        correctIndex: 2,
      },
      {
        id: 'q5',
        prompt: 'A Core Web Vital that measures visual stability is:',
        options: ['LCP', 'CLS', 'TTFB', 'DNS lookup time'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'data-analytics',
    goal: 'data-analytics',
    title: 'Data Analytics & Visualization',
    tags: ['SQL', 'Python', 'Dashboards'],
    durationWeeks: 10,
    description:
      'Turn raw data into decisions — querying, cleaning, and presenting data that stakeholders actually act on.',
    matchReasons: [
      'Strong fit for analytical, detail-oriented roles',
      'Matches your stated weekly availability',
      'High demand across both tech and non-tech companies',
    ],
    modules: [
      {
        id: 'sql',
        title: 'SQL for Analysis',
        summary: 'Querying, joining, and aggregating relational data.',
        content: [
          'Joins: inner, left, and when each is correct',
          'Window functions for running totals and ranks',
          'Query performance basics — indexes and explain plans',
        ],
      },
      {
        id: 'cleaning',
        title: 'Data Cleaning with Python',
        summary: 'Handling missing data, outliers, and inconsistent formats.',
        content: [
          'Identifying and handling missing values',
          'Detecting outliers without discarding real signal',
          'Standardizing formats across data sources',
        ],
      },
      {
        id: 'viz',
        title: 'Visualization Principles',
        summary: 'Choosing the right chart for the question being asked.',
        content: [
          'Matching chart type to the comparison being made',
          'Avoiding chart junk and misleading axes',
          'Designing for the audience, not the analyst',
        ],
      },
      {
        id: 'dashboards',
        title: 'Building Dashboards',
        summary: 'Assembling metrics into a dashboard people actually check.',
        content: [
          'Picking the 3-5 metrics that matter',
          'Refresh cadence and data latency tradeoffs',
          'Designing for a five-second glance',
        ],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'A window function is most useful for:',
        options: [
          'Deleting duplicate rows',
          'Running totals and rankings within groups',
          'Encrypting sensitive columns',
          'Changing a column data type',
        ],
        correctIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'When handling missing data, the first step should be:',
        options: [
          'Always delete the rows',
          'Always fill with zero',
          'Understand why the data is missing before choosing a strategy',
          'Ignore it — most models handle it automatically',
        ],
        correctIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'A misleading chart axis most commonly causes:',
        options: [
          'Faster load times',
          'Exaggerated or understated differences between values',
          'Better accessibility',
          'Improved query performance',
        ],
        correctIndex: 1,
      },
      {
        id: 'q4',
        prompt: 'A good dashboard for daily use should generally:',
        options: [
          'Show every available metric at once',
          'Focus on a small number of metrics that drive decisions',
          'Refresh only once a year',
          'Avoid any visual charts',
        ],
        correctIndex: 1,
      },
      {
        id: 'q5',
        prompt: 'An INNER JOIN returns:',
        options: [
          'All rows from both tables regardless of match',
          'Only rows with matching keys in both tables',
          'Only rows from the left table',
          'A random sample of rows',
        ],
        correctIndex: 1,
      },
    ],
  },
];

export function getCourseByGoal(goal: CareerGoal): Course {
  return COURSES.find((c) => c.goal === goal) ?? COURSES[0];
}

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}
