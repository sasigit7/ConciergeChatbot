# AI Concierge Chatbot - Tech Stack & Project Structure

## 🚀 Recommended Tech Stack

### **Core Backend Technologies**

```yaml
Language & Runtime:
  - Node.js 20 LTS (JavaScript/TypeScript)
  - TypeScript 5.x for type safety
  
Framework:
  - NestJS (Enterprise-grade Node.js framework)
  - Express.js as underlying HTTP server
  
API Layer:
  - GraphQL with Apollo Server (primary API)
  - REST API for webhook endpoints
  - WebSocket with Socket.IO for real-time messaging
```

### **Frontend Technologies**

```yaml
Admin Dashboard:
  - Next.js 14 with App Router
  - React 18
  - TypeScript
  - Tailwind CSS + shadcn/ui components
  - React Query for state management
  - Recharts for analytics visualization

Chat Widget:
  - Preact (lightweight React alternative)
  - TypeScript
  - Webpack 5 for bundling
  - PostCSS for styling
  - CDN deployment via CloudFlare
```

### **AI/NLP Services**

```yaml
Primary NLP:
  - OpenAI GPT-4 API for complex queries
  - Google Dialogflow CX for intent recognition
  
Fallback/Cost Optimization:
  - Rasa Open Source for basic intents
  - spaCy for entity extraction
  
Vector Database:
  - Pinecone for semantic search
  - ChromaDB as open-source alternative
```

### **Database & Storage**

```yaml
Primary Database:
  - PostgreSQL 15 with pgvector extension
  - Prisma ORM for type-safe database access
  
Caching Layer:
  - Redis 7 for session management
  - Redis Pub/Sub for real-time events
  
Search Engine:
  - Elasticsearch 8 for conversation history
  
File Storage:
  - AWS S3 or Cloudflare R2
  - CDN via CloudFlare
```

### **Message Queue & Event Streaming**

```yaml
Message Queue:
  - RabbitMQ for reliable message delivery
  - Bull Queue for job processing
  
Event Streaming:
  - Apache Kafka for high-volume events
  - Debezium for CDC (Change Data Capture)
```

### **Infrastructure & DevOps**

```yaml
Container & Orchestration:
  - Docker
  - Kubernetes (K8s) or Docker Swarm
  - Helm Charts for K8s deployments

Cloud Provider:
  - AWS (primary) or Google Cloud Platform
  - CloudFlare for CDN and DDoS protection

CI/CD:
  - GitHub Actions
  - ArgoCD for GitOps
  - Terraform for Infrastructure as Code

Monitoring & Logging:
  - Prometheus + Grafana for metrics
  - ELK Stack (Elasticsearch, Logstash, Kibana)
  - Sentry for error tracking
  - New Relic or DataDog for APM
```

### **Third-Party Integrations**

```yaml
Communication Channels:
  - Twilio for SMS and WhatsApp Business API
  - Meta Graph API for Facebook Messenger
  - SendGrid for email notifications

Payment Processing:
  - Stripe Connect for marketplace payments
  - Square API for POS integration

Calendar & Booking:
  - Google Calendar API
  - Calendly API
  - Microsoft Graph API for Outlook

CRM Integrations:
  - Salesforce REST API
  - HubSpot API
  - Zapier for general integrations
```

### **Security & Compliance**

```yaml
Authentication:
  - Auth0 or AWS Cognito
  - JWT tokens with refresh rotation
  - OAuth 2.0 for integrations

Security Tools:
  - Vault for secrets management
  - Let's Encrypt for SSL certificates
  - OWASP Dependency Check
  - SonarQube for code quality

Compliance:
  - AWS KMS for encryption keys
  - Audit logging with immutable storage
  - Data masking for PII
```

## 📁 Project Structure

### **Monorepo Structure (Recommended)**

```bash
ai-concierge-chatbot/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── cd-staging.yml
│   │   └── cd-production.yml
│   └── CODEOWNERS
│
├── apps/
│   ├── api/                      # Main API Server (NestJS)
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── auth.controller.ts
│   │   │   │   │   ├── auth.service.ts
│   │   │   │   │   ├── auth.module.ts
│   │   │   │   │   ├── strategies/
│   │   │   │   │   ├── guards/
│   │   │   │   │   └── dto/
│   │   │   │   ├── tenant/
│   │   │   │   │   ├── tenant.controller.ts
│   │   │   │   │   ├── tenant.service.ts
│   │   │   │   │   ├── tenant.module.ts
│   │   │   │   │   └── entities/
│   │   │   │   ├── conversation/
│   │   │   │   │   ├── conversation.gateway.ts
│   │   │   │   │   ├── conversation.service.ts
│   │   │   │   │   └── conversation.module.ts
│   │   │   │   ├── booking/
│   │   │   │   │   ├── booking.controller.ts
│   │   │   │   │   ├── booking.service.ts
│   │   │   │   │   └── adapters/
│   │   │   │   │       ├── calendly.adapter.ts
│   │   │   │   │       └── google-calendar.adapter.ts
│   │   │   │   ├── nlp/
│   │   │   │   │   ├── nlp.service.ts
│   │   │   │   │   ├── providers/
│   │   │   │   │   │   ├── openai.provider.ts
│   │   │   │   │   │   ├── dialogflow.provider.ts
│   │   │   │   │   │   └── rasa.provider.ts
│   │   │   │   │   └── nlp.module.ts
│   │   │   │   ├── channel/
│   │   │   │   │   ├── channel.service.ts
│   │   │   │   │   ├── adapters/
│   │   │   │   │   │   ├── whatsapp.adapter.ts
│   │   │   │   │   │   ├── facebook.adapter.ts
│   │   │   │   │   │   ├── sms.adapter.ts
│   │   │   │   │   │   └── web.adapter.ts
│   │   │   │   │   └── channel.module.ts
│   │   │   │   ├── analytics/
│   │   │   │   │   ├── analytics.service.ts
│   │   │   │   │   ├── analytics.controller.ts
│   │   │   │   │   └── analytics.module.ts
│   │   │   │   └── integration/
│   │   │   │       ├── integration.service.ts
│   │   │   │       ├── providers/
│   │   │   │       └── integration.module.ts
│   │   │   ├── common/
│   │   │   │   ├── decorators/
│   │   │   │   │   ├── tenant.decorator.ts
│   │   │   │   │   └── rate-limit.decorator.ts
│   │   │   │   ├── filters/
│   │   │   │   │   └── http-exception.filter.ts
│   │   │   │   ├── interceptors/
│   │   │   │   │   ├── logging.interceptor.ts
│   │   │   │   │   └── transform.interceptor.ts
│   │   │   │   ├── middleware/
│   │   │   │   │   └── tenant.middleware.ts
│   │   │   │   └── pipes/
│   │   │   │       └── validation.pipe.ts
│   │   │   ├── config/
│   │   │   │   ├── app.config.ts
│   │   │   │   ├── database.config.ts
│   │   │   │   └── redis.config.ts
│   │   │   ├── database/
│   │   │   │   ├── prisma/
│   │   │   │   │   ├── schema.prisma
│   │   │   │   │   └── migrations/
│   │   │   │   └── seeds/
│   │   │   └── main.ts
│   │   ├── test/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── admin/                    # Admin Dashboard (Next.js)
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── (dashboard)/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── conversations/
│   │   │   │   ├── analytics/
│   │   │   │   ├── settings/
│   │   │   │   └── integrations/
│   │   │   └── api/
│   │   ├── components/
│   │   │   ├── ui/              # shadcn/ui components
│   │   │   ├── dashboard/
│   │   │   ├── charts/
│   │   │   └── forms/
│   │   ├── lib/
│   │   │   ├── api/
│   │   │   ├── hooks/
│   │   │   └── utils/
│   │   ├── public/
│   │   ├── styles/
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── widget/                   # Chat Widget (Preact)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ChatWindow.tsx
│   │   │   │   ├── MessageList.tsx
│   │   │   │   ├── InputBar.tsx
│   │   │   │   └── QuickReplies.tsx
│   │   │   ├── services/
│   │   │   │   ├── websocket.service.ts
│   │   │   │   └── api.service.ts
│   │   │   ├── hooks/
│   │   │   ├── utils/
│   │   │   ├── index.tsx
│   │   │   └── embed.js        # Embed script
│   │   ├── webpack.config.js
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── webhook-handler/         # Serverless webhook processor
│   │   ├── src/
│   │   │   ├── handlers/
│   │   │   │   ├── whatsapp.handler.ts
│   │   │   │   ├── facebook.handler.ts
│   │   │   │   └── sms.handler.ts
│   │   │   └── index.ts
│   │   ├── serverless.yml
│   │   └── package.json
│   │
│   └── worker/                  # Background job processor
│       ├── src/
│       │   ├── jobs/
│       │   │   ├── email.job.ts
│       │   │   ├── analytics.job.ts
│       │   │   └── sync.job.ts
│       │   └── index.ts
│       ├── Dockerfile
│       └── package.json
│
├── packages/                    # Shared packages
│   ├── database/               # Prisma client
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   └── package.json
│   │
│   ├── types/                  # Shared TypeScript types
│   │   ├── src/
│   │   │   ├── tenant.types.ts
│   │   │   ├── conversation.types.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── utils/                  # Shared utilities
│   │   ├── src/
│   │   │   ├── encryption.ts
│   │   │   ├── validation.ts
│   │   │   └── date.ts
│   │   └── package.json
│   │
│   └── config/                 # Shared configuration
│       ├── eslint/
│       ├── tsconfig/
│       └── jest/
│
├── infrastructure/             # Infrastructure as Code
│   ├── terraform/
│   │   ├── environments/
│   │   │   ├── dev/
│   │   │   ├── staging/
│   │   │   └── production/
│   │   ├── modules/
│   │   │   ├── eks/
│   │   │   ├── rds/
│   │   │   ├── redis/
│   │   │   └── s3/
│   │   └── main.tf
│   │
│   ├── kubernetes/
│   │   ├── base/
│   │   ├── overlays/
│   │   │   ├── dev/
│   │   │   ├── staging/
│   │   │   └── production/
│   │   └── kustomization.yaml
│   │
│   └── docker/
│       ├── nginx/
│       └── docker-compose.yml
│
├── scripts/                    # Utility scripts
│   ├── setup.sh
│   ├── deploy.sh
│   └── seed-db.ts
│
├── docs/                       # Documentation
│   ├── api/
│   ├── architecture/
│   ├── deployment/
│   └── development/
│
├── .env.example
├── .gitignore
├── docker-compose.yml          # Local development
├── lerna.json                  # Monorepo config
├── nx.json                     # Nx workspace config
├── package.json                # Root package.json
├── README.md
└── tsconfig.json              # Root TypeScript config
```

## 🗄️ Database Schema (Prisma)

```prisma
// packages/database/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Multi-tenant model
model Tenant {
  id                String    @id @default(cuid())
  name              String
  slug              String    @unique
  subscriptionTier  String    @default("starter")
  isActive          Boolean   @default(true)
  settings          Json
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  users             User[]
  conversations     Conversation[]
  integrations      Integration[]
  knowledgeBase     KnowledgeBase[]
  analytics         Analytics[]
  
  @@index([slug])
}

model User {
  id          String    @id @default(cuid())
  email       String    @unique
  password    String
  firstName   String
  lastName    String
  role        String    @default("admin")
  tenantId    String
  tenant      Tenant    @relation(fields: [tenantId], references: [id])
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  @@index([email])
  @@index([tenantId])
}

model Conversation {
  id          String    @id @default(cuid())
  tenantId    String
  tenant      Tenant    @relation(fields: [tenantId], references: [id])
  channel     String    // web, whatsapp, facebook, sms
  customerId  String?
  customer    Customer? @relation(fields: [customerId], references: [id])
  status      String    @default("active")
  metadata    Json?
  startedAt   DateTime  @default(now())
  endedAt     DateTime?
  
  messages    Message[]
  
  @@index([tenantId, status])
  @@index([customerId])
}

model Message {
  id             String       @id @default(cuid())
  conversationId String
  conversation   Conversation @relation(fields: [conversationId], references: [id])
  role           String       // user, assistant, system
  content        String
  metadata       Json?
  createdAt      DateTime     @default(now())
  
  @@index([conversationId])
}

model Customer {
  id            String         @id @default(cuid())
  email         String?
  phone         String?
  name          String?
  metadata      Json?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  
  conversations Conversation[]
  
  @@index([email])
  @@index([phone])
}

model Integration {
  id          String    @id @default(cuid())
  tenantId    String
  tenant      Tenant    @relation(fields: [tenantId], references: [id])
  type        String    // calendly, google_calendar, square, etc
  credentials Json      // Encrypted
  settings    Json?
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  @@unique([tenantId, type])
}

model KnowledgeBase {
  id        String    @id @default(cuid())
  tenantId  String
  tenant    Tenant    @relation(fields: [tenantId], references: [id])
  title     String
  content   String
  category  String?
  embedding Float[]   // pgvector embedding
  metadata  Json?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  
  @@index([tenantId, category])
}

model Analytics {
  id               String    @id @default(cuid())
  tenantId         String
  tenant           Tenant    @relation(fields: [tenantId], references: [id])
  date             DateTime
  totalConversations Int
  resolvedQueries  Int
  handoffRate      Float
  avgResponseTime  Float
  satisfaction     Float?
  metadata         Json?
  
  @@unique([tenantId, date])
  @@index([tenantId, date])
}
```

## 🚦 Development Workflow

### **Local Development Setup**

```bash
# 1. Clone repository
git clone https://github.com/your-org/ai-concierge-chatbot.git
cd ai-concierge-chatbot

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env with your credentials

# 4. Start Docker services
docker-compose up -d

# 5. Run database migrations
npm run db:migrate

# 6. Seed database
npm run db:seed

# 7. Start development servers
npm run dev
```

### **Docker Compose for Local Development**

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: pgvector/pgvector:pg15
    environment:
      POSTGRES_DB: chatbot
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  elasticsearch:
    image: elasticsearch:8.11.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
    volumes:
      - es_data:/usr/share/elasticsearch/data

  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: password

volumes:
  postgres_data:
  redis_data:
  es_data:
```

## 🔑 Key Configuration Files

### **API Configuration (NestJS)**

```typescript
// apps/api/src/config/app.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.NODE_ENV || 'development',
  
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d',
    refreshExpiresIn: '30d',
  },
  
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD,
  },
  
  database: {
    url: process.env.DATABASE_URL,
  },
  
  elasticsearch: {
    node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
  },
  
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4-turbo-preview',
  },
  
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    whatsappNumber: process.env.TWILIO_WHATSAPP_NUMBER,
  },
  
  rateLimit: {
    ttl: 60,
    limit: 100,
  },
}));
```

### **Package.json Scripts (Root)**

```json
{
  "name": "ai-concierge-chatbot",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "nx run-many --target=dev --all --parallel",
    "build": "nx run-many --target=build --all",
    "test": "nx run-many --target=test --all",
    "lint": "nx run-many --target=lint --all",
    "db:migrate": "prisma migrate dev",
    "db:seed": "ts-node scripts/seed-db.ts",
    "docker:up": "docker-compose up -d",
    "docker:down": "docker-compose down",
    "deploy:staging": "scripts/deploy.sh staging",
    "deploy:production": "scripts/deploy.sh production"
  },
  "devDependencies": {
    "@nx/workspace": "^17.0.0",
    "lerna": "^7.0.0",
    "typescript": "^5.0.0"
  }
}
```

## 🎯 Implementation Priority

### **Phase 1: Core MVP (Months 1-4)**
1. Basic API with authentication
2. Web widget implementation
3. Simple FAQ handling with Rasa
4. PostgreSQL multi-tenant setup
5. Basic admin dashboard

### **Phase 2: Integrations (Months 5-8)**
1. WhatsApp Business integration
2. Calendar booking (Calendly/Google)
3. Advanced NLP with OpenAI
4. Analytics dashboard
5. CRM integrations

### **Phase 3: Scale & Optimize (Months 9-12)**
1. Facebook Messenger & SMS
2. Advanced analytics
3. White-label features
4. Performance optimization
5. Enterprise security features

## 🔒 Security Considerations

- **Row-level security** in PostgreSQL for tenant isolation
- **API rate limiting** per tenant
- **JWT with refresh tokens** for authentication
- **Encrypted credentials** storage for integrations
- **GDPR/CCPA compliance** tools built-in
- **Regular security audits** with automated tools
- **PCI DSS compliance** for payment processing

## 📊 Monitoring & Observability

```yaml
Metrics Collection:
  - Prometheus for metrics
  - Custom business metrics
  - Real-time dashboards

Logging:
  - Structured logging with Winston
  - Centralized log aggregation
  - Log retention policies

Tracing:
  - OpenTelemetry integration
  - Distributed tracing
  - Performance profiling

Alerting:
  - PagerDuty integration
  - Custom alert rules
  - Escalation policies
```

This architecture provides a solid foundation for building a scalable, multi-tenant AI chatbot platform while maintaining flexibility for future growth and feature additions.