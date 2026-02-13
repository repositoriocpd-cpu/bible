# 📖 RAIZ DO TEXTO

> Sistema profissional de análise bíblica com inteligência artificial

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7.4.0-2D3748?logo=prisma)

## 🌟 Sobre o Projeto

O **RAIZ DO TEXTO** é uma plataforma que utiliza inteligência artificial para analisar frases populares atribuídas à Bíblia, diferenciando tradição religiosa do sentido original do texto bíblico através de análise histórico-gramatical.

### Funcionalidades

- ✅ **Análise Inteligente**: Verifica se frases são bíblicas e analisa seu contexto real
- ✅ **Múltiplos Provedores IA**: Integração com Groq, OpenRouter e Google Gemini
- ✅ **Biblioteca de Estudos**: Salva e organiza análises realizadas
- ✅ **Exportação PDF**: Baixe análises em formato PDF
- ✅ **Interface Profissional**: Design moderno em dark mode com paleta dourada
- ✅ **Análise Completa**: Contexto literário, histórico, linguístico e aplicação prática

## 🎨 Design System

O projeto utiliza um **tema escuro profissional** com paleta de cores inspirada em dashboards analíticos modernos.

### Documentação de Design

- 📘 **[DESIGN.md](./DESIGN.md)** - Documentação completa do design system
- 🎯 **[DESIGN-QUICKREF.md](./DESIGN-QUICKREF.md)** - Guia rápido de referência

### Paleta Principal

- **Background**: `#0F0F0F` (preto profundo)
- **Cards/Painéis**: `#1A1A1A` (elevado)
- **Acento Primário**: `#E89946` (dourado laranja)
- **Texto**: `#F5F5F5` (claro)

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ 
- npm, yarn, pnpm ou bun

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/bible-main.git
cd bible-main
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas chaves de API:
```env
DATABASE_URL="file:./dev.db"
GROQ_API_KEY="sua-chave-groq"
OPENROUTER_API_KEY="sua-chave-openrouter"
GOOGLE_API_KEY="sua-chave-google"
```

4. Execute as migrations do banco:
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

6. Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📁 Estrutura do Projeto

```
bible-main/
├── src/
│   ├── app/                    # App Router (Next.js 16)
│   │   ├── globals.css        # Tokens de design globais
│   │   ├── page.tsx           # Página inicial
│   │   ├── analyze/           # Página de análise
│   │   ├── library/           # Biblioteca de estudos
│   │   ├── admin/             # Painel administrativo
│   │   └── api/               # API Routes
│   ├── components/            # Componentes React
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   └── AnalysisResult.tsx
│   └── lib/                   # Utilitários
│       ├── ai-service.ts      # Serviço de IA
│       └── prisma.ts          # Cliente Prisma
├── prisma/
│   └── schema.prisma          # Schema do banco de dados
├── public/                    # Assets estáticos
├── DESIGN.md                  # Documentação de design
├── DESIGN-QUICKREF.md         # Guia rápido de design
└── README.md
```

## 🛠️ Tecnologias

### Frontend
- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **CSS Modules** - Estilização com escopo

### Backend
- **Prisma** - ORM para SQLite
- **Next.js API Routes** - Endpoints serverless

### Inteligência Artificial
- **Groq API** - Llama 3.3 70B (primário)
- **OpenRouter** - Gemini 2.0 Flash (fallback)
- **Google Generative AI** - Gemini 1.5 Flash (fallback final)

### Utilitários
- **Lucide React** - Ícones
- **html2canvas** - Geração de imagens
- **jsPDF** - Exportação PDF
- **clsx** - Utilitário de classes CSS

## 🎯 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa linter
```

## 📊 Fluxo de Análise

1. Usuário digita uma frase popular
2. Sistema envia para API de análise
3. IA analisa usando prompt estruturado
4. Retorna JSON com:
   - Versículo original (se existir)
   - Grau de fidelidade (ALTA/MÉDIA/BAIXA)
   - Contexto literário e histórico
   - Análise linguística
   - Interpretação correta
   - Descrição de erros
   - Versículos relacionados
   - Aplicação prática
5. Interface exibe resultado estruturado
6. Usuário pode exportar em PDF

## 🎨 Customização de Design

Para manter consistência visual, sempre use as variáveis CSS definidas em `globals.css`:

```css
/* Exemplo */
.meu-componente {
  background: var(--background-elevated);
  color: var(--foreground);
  border: 1px solid var(--border);
}
```

Consulte [DESIGN-QUICKREF.md](./DESIGN-QUICKREF.md) para templates prontos.

## 🔐 Segurança

- Variáveis de ambiente nunca commitadas
- API keys protegidas server-side
- Validação de entrada em todos endpoints
- Sanitização de dados do usuário

## 📝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Convenções de Código

- Use TypeScript para novos arquivos
- Siga as variáveis CSS do design system
- Mantenha componentes pequenos e reutilizáveis
- Adicione CSS Modules para estilos
- Comente código complexo

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- Comunidade Next.js
- Provedores de IA: Groq, OpenRouter, Google
- Fonts: Google Fonts (Inter, Merriweather)
- Ícones: Lucide React

## 📞 Contato

Para dúvidas ou sugestões, entre em contato através das issues do GitHub.

---

**Desenvolvido com ❤️ para análise bíblica profunda e precisa**
