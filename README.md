<div align="center">

# 🔗 QuickLink - URL Shortener

### ✨ Transforme links longos em URLs curtas e memoráveis em segundos! ✨

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

<br/>

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Link.png" alt="Link" width="150" />

**Interface moderna e responsiva para encurtamento de URLs**

[🚀 Demo](#) • [📦 Instalação](#-instalação) • [🛠️ Tecnologias](#️-tecnologias) • [💡 Desafios](#-desafios-enfrentados)

</div>

---

## 📖 Sobre o Projeto

O **QuickLink** é uma aplicação frontend moderna para encurtamento de URLs, desenvolvida com foco em **experiência do usuário** e **performance**. 

### ✅ O que você pode fazer:

- 🔗 **Encurtar URLs longas** em um clique
- 📋 **Copiar para área de transferência** com feedback visual
- ⚡ **Resposta instantânea** com estados de loading elegantes
- 📱 **Design responsivo** que funciona em qualquer dispositivo
- 🎨 **Interface dark mode** moderna e agradável aos olhos

---

## 🛠️ Tecnologias

<table>
<tr>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React" />
<br><strong>React 19</strong>
<br><sub>UI Library</sub>
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=ts" width="48" height="48" alt="TypeScript" />
<br><strong>TypeScript</strong>
<br><sub>Type Safety</sub>
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=vite" width="48" height="48" alt="Vite" />
<br><strong>Vite</strong>
<br><sub>Build Tool</sub>
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="Tailwind" />
<br><strong>Tailwind</strong>
<br><sub>Styling</sub>
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=docker" width="48" height="48" alt="Docker" />
<br><strong>Docker</strong>
<br><sub>Container</sub>
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=nginx" width="48" height="48" alt="Nginx" />
<br><strong>Nginx</strong>
<br><sub>Web Server</sub>
</td>
</tr>
</table>

### 📁 Arquitetura do Projeto

```
📦 frontend-shortener
├── 📂 components/          # Componentes React reutilizáveis
│   ├── 📂 common/          # UI components (Button, Input, Spinner...)
│   ├── 📂 icons/           # Ícones SVG como componentes
│   ├── 📄 ResultCard.tsx   # Card de resultado com URL encurtada
│   └── 📄 UrlForm.tsx      # Formulário de entrada
├── 📂 hooks/               # Custom React Hooks
│   └── 📄 useShortenUrl.ts # Hook para gerenciar estado de encurtamento
├── 📂 pages/               # Páginas da aplicação
│   └── 📄 Home.tsx         # Página principal
├── 📂 services/            # Camada de serviços (API calls)
│   └── 📄 shortenerService.ts
├── 📂 utils/               # Funções utilitárias
│   └── 📄 validators.ts    # Validação de URLs
├── 📄 App.tsx              # Componente raiz
├── 📄 Dockerfile           # Multi-stage build
└── 📄 docker-compose.yml   # Orquestração de containers
```

---

## 📦 Instalação

### Pré-requisitos

- **Node.js** 18+ 
- **npm** ou **yarn**
- **Docker** (opcional, para deploy containerizado)

### 🚀 Rodando Localmente (Desenvolvimento)

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/quicklink-url-shortener.git

# 2. Entre no diretório
cd quicklink-url-shortener

# 3. Instale as dependências
npm install

# 4. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com sua API_URL e API_KEY

# 5. Inicie o servidor de desenvolvimento
npm run dev
```

📍 Acesse: **http://localhost:5173**

### 🐳 Rodando com Docker

```bash
# 1. Configure as variáveis de ambiente
export API_URL="https://sua-api.com/shorten"
export API_KEY="sua-chave-api"

# 2. Suba o container
docker-compose up -d --build
```

📍 Acesse: **http://localhost:5153**

### 📋 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run preview` | Preview do build de produção |

---

## 💡 Desafios Enfrentados

### 🔐 1. Clipboard API vs Ambiente HTTP

**Problema:** A moderna `navigator.clipboard` API só funciona em contextos seguros (HTTPS), mas durante desenvolvimento e em alguns ambientes de produção, a aplicação roda em HTTP.

**Solução:** Implementamos um fallback usando `document.execCommand('copy')` que, apesar de deprecated, funciona consistentemente em HTTP:

```typescript
// Fallback para ambientes HTTP
const handleCopy = () => {
  const textArea = document.createElement('textarea');
  textArea.value = shortUrl;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  setIsCopied(true);
};
```

---

### 🔄 2. Gerenciamento de Estado Complexo

**Problema:** Múltiplos estados interdependentes (loading, error, success, data) tornavam o componente difícil de manter.

**Solução:** Criamos um **Custom Hook** (`useShortenUrl`) que encapsula toda a lógica de estado e chamadas à API:

```typescript
export const useShortenUrl = () => {
  const [data, setData] = useState<ShortenerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Lógica encapsulada...
  
  return { data, error, isLoading, shortenUrl };
};
```

✨ **Benefícios:** Componentes mais limpos, lógica reutilizável, testes mais fáceis.

---

### 🐳 3. Variáveis de Ambiente no Build Docker

**Problema:** As variáveis de ambiente definidas em `.env` não eram aplicadas durante o build Docker, pois o Vite realiza substituição em tempo de build.

**Solução:** Configuramos **build args** no Dockerfile que são passados como variáveis de ambiente durante o estágio de build:

```dockerfile
FROM node:22-alpine AS build

ARG VITE_API_URL
ARG VITE_API_KEY

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_KEY=$VITE_API_KEY

# Remove .env files para garantir uso dos build args
RUN rm -f .env .env.* 2>/dev/null || true

RUN npm run build
```

---

### 🎨 4. Feedback Visual Consistente

**Problema:** Estados de loading, sucesso e erro precisavam de feedback visual claro sem poluir a interface.

**Solução:** Sistema de componentes modulares com animações CSS:

- 🔄 **Spinner** animado durante carregamento
- ✅ **Toast de sucesso** com auto-dismiss
- ❌ **Mensagem de erro** com estilo diferenciado
- 📋 **Botão de copiar** com transição para ícone de check

<div align="center">

**Feito com ❤️ e ☕**

</div>
