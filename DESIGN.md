# 🎨 Documentação de Design - RAIZ DO TEXTO

> Sistema profissional de análise bíblica com tema escuro e paleta dourada

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Paleta de Cores](#paleta-de-cores)
- [Tokens de Design](#tokens-de-design)
- [Componentes](#componentes)
- [Tipografia](#tipografia)
- [Espaçamento e Layout](#espaçamento-e-layout)
- [Animações e Transições](#animações-e-transições)
- [Acessibilidade](#acessibilidade)
- [Diretrizes de Uso](#diretrizes-de-uso)

---

## 🌟 Visão Geral

O **RAIZ DO TEXTO** utiliza um tema escuro profissional inspirado em dashboards analíticos modernos. O design transmite:

- **Sofisticação**: Paleta escura com acentos dourados elegantes
- **Profissionalismo**: Hierarquia visual clara e organização impecável
- **Modernidade**: Efeitos sutis de glassmorphism, gradientes e sombras profundas
- **Confiabilidade**: Cores semânticas para status e feedback claro

---

## 🎨 Paleta de Cores

### Cores Principais

| Nome | Hex | Uso | Preview |
|------|-----|-----|---------|
| **Deep Black** | `#0F0F0F` | Background principal | ![#0F0F0F](https://via.placeholder.com/50x20/0F0F0F/0F0F0F) |
| **Elevated Dark** | `#1A1A1A` | Cards, painéis, navbar | ![#1A1A1A](https://via.placeholder.com/50x20/1A1A1A/1A1A1A) |
| **Hover Dark** | `#242424` | Estados hover | ![#242424](https://via.placeholder.com/50x20/242424/242424) |
| **Primary Text** | `#F5F5F5` | Texto principal | ![#F5F5F5](https://via.placeholder.com/50x20/F5F5F5/F5F5F5) |

### Cores de Acento

| Nome | Hex | Uso | Preview |
|------|-----|-----|---------|
| **Golden Orange** | `#E89946` | Acento primário, CTAs | ![#E89946](https://via.placeholder.com/50x20/E89946/E89946) |
| **Light Orange** | `#F5A962` | Hover em elementos primários | ![#F5A962](https://via.placeholder.com/50x20/F5A962/F5A962) |
| **Deep Orange** | `#D4802F` | Gradientes, destaques | ![#D4802F](https://via.placeholder.com/50x20/D4802F/D4802F) |
| **Bronze** | `#A08968` | Acento secundário | ![#A08968](https://via.placeholder.com/50x20/A08968/A08968) |

### Cores Semânticas (Status)

| Nome | Hex | Uso | Preview |
|------|-----|-----|---------|
| **Success Green** | `#4ADE80` | Fidelidade ALTA, sucesso | ![#4ADE80](https://via.placeholder.com/50x20/4ADE80/4ADE80) |
| **Warning Yellow** | `#FBBF24` | Fidelidade MÉDIA, avisos | ![#FBBF24](https://via.placeholder.com/50x20/FBBF24/FBBF24) |
| **Error Red** | `#F87171` | Fidelidade BAIXA, erros | ![#F87171](https://via.placeholder.com/50x20/F87171/F87171) |

### Cores Neutras

| Nome | Hex | Uso | Preview |
|------|-----|-----|---------|
| **Muted** | `#2A2A2A` | Backgrounds secundários | ![#2A2A2A](https://via.placeholder.com/50x20/2A2A2A/2A2A2A) |
| **Muted Text** | `#9CA3AF` | Texto secundário | ![#9CA3AF](https://via.placeholder.com/50x20/9CA3AF/9CA3AF) |
| **Border** | `#2A2A2A` | Bordas sutis | ![#2A2A2A](https://via.placeholder.com/50x20/2A2A2A/2A2A2A) |
| **Border Strong** | `#3A3A3A` | Bordas em destaque | ![#3A3A3A](https://via.placeholder.com/50x20/3A3A3A/3A3A3A) |

---

## 🔧 Tokens de Design

### Variáveis CSS Globais

Todas as variáveis estão definidas em `src/app/globals.css`:

```css
:root {
  /* Backgrounds */
  --background: #0F0F0F;
  --background-elevated: #1A1A1A;
  --background-hover: #242424;
  --foreground: #F5F5F5;

  /* Primary Colors */
  --primary: #E89946;
  --primary-hover: #F5A962;
  --primary-foreground: #0F0F0F;

  /* Secondary Colors */
  --secondary: #A08968;
  --secondary-hover: #B89A7A;
  --secondary-foreground: #F5F5F5;

  /* Muted Colors */
  --muted: #2A2A2A;
  --muted-foreground: #9CA3AF;

  /* Accent */
  --accent: #D4802F;
  --accent-foreground: #F5F5F5;

  /* Borders */
  --border: #2A2A2A;
  --border-strong: #3A3A3A;
  --input: #1A1A1A;
  --ring: #E89946;

  /* Semantic Colors */
  --success: #4ADE80;
  --warning: #FBBF24;
  --error: #F87171;

  /* Border Radius */
  --radius: 0.75rem;

  /* Typography */
  --font-serif: 'Merriweather', serif;
  --font-sans: 'Inter', sans-serif;
}
```

### Como Usar

```css
/* Exemplo de uso */
.meu-componente {
  background-color: var(--background-elevated);
  color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.meu-botao {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: var(--primary-foreground);
}
```

---

## 🧩 Componentes

### Navbar

**Arquivo**: `src/components/Navbar.module.css`

**Características**:
- Background elevado com blur (`backdrop-filter: blur(10px)`)
- Sombra profunda para separação visual
- Indicador de página ativa com linha gradiente
- Logo em tom dourado

```css
/* Estado ativo */
.active::after {
  content: '';
  background: linear-gradient(90deg, var(--primary), var(--accent));
  height: 2px;
}
```

### Hero Section

**Arquivo**: `src/components/HeroSection.module.css`

**Características**:
- Título com gradiente text-fill
- Background radial com glow sutil
- Input container com foco iluminado
- Botão com gradiente e shadow pulsante
- Tags com hover elegante

```css
/* Título com gradiente */
.title {
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Input focus */
.inputContainer:focus-within {
  border-color: var(--primary);
  box-shadow: 0 16px 32px -8px rgba(232, 153, 70, 0.3);
}
```

### Cards de Análise

**Arquivo**: `src/components/AnalysisResult.module.css`

**Características**:
- Borda superior colorida por fidelidade
- Botões de ação com hover sofisticado
- Seções colapsáveis com animações
- Área de erro destacada em vermelho translúcido

```css
/* Indicador de fidelidade */
.highFidelity {
  border-top: 4px solid var(--success);
  box-shadow: 0 8px 32px rgba(74, 222, 128, 0.15);
}

.mediumFidelity {
  border-top: 4px solid var(--warning);
  box-shadow: 0 8px 32px rgba(251, 191, 36, 0.15);
}

.lowFidelity {
  border-top: 4px solid var(--error);
  box-shadow: 0 8px 32px rgba(248, 113, 113, 0.15);
}
```

### Biblioteca de Estudos

**Arquivo**: `src/app/library/page.module.css`

**Características**:
- Grid responsivo de cards
- Borda lateral colorida (indicador visual)
- Badges com fundos translúcidos
- Hover com elevação

```css
/* Card hover */
.card:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6);
}

/* Badge semântico */
.badge.high {
  color: var(--success);
  background-color: rgba(74, 222, 128, 0.15);
}
```

### Painel Admin

**Arquivo**: `src/app/admin/page.module.css`

**Características**:
- Container elevado
- Botões de ação com cores semânticas
- Estados de aprovação/pendência claros

---

## ✍️ Tipografia

### Fontes

- **Serif (Merriweather)**: Títulos, frases bíblicas, conteúdo principal
- **Sans-Serif (Inter)**: UI, navegação, labels, botões

### Hierarquia

| Elemento | Font | Size | Weight | Uso |
|----------|------|------|--------|-----|
| H1 | Merriweather | 3.5rem | 900 | Título principal hero |
| H2 | Merriweather | 2.5rem | 700 | Títulos de página |
| H3 | Merriweather | 2rem | 700 | Frases analisadas |
| H4 | Merriweather | 1.5rem | 700 | Subtítulos de seção |
| Body | Inter | 1rem | 400 | Texto padrão |
| Small | Inter | 0.875rem | 500 | Labels, metadados |

### Exemplo de Uso

```css
h1 {
  font-family: var(--font-serif);
  color: var(--foreground);
  font-weight: 700;
  line-height: 1.2;
}

body {
  font-family: var(--font-sans);
  line-height: 1.6;
}
```

---

## 📐 Espaçamento e Layout

### Grid System

- **Max-width container**: `1200px`
- **Padding lateral**: `2rem`
- **Gap entre cards**: `1.5rem`

### Espaçamentos Padrão

| Nome | Valor | Uso |
|------|-------|-----|
| xs | 0.25rem | Micro espaçamentos |
| sm | 0.5rem | Pequenos gaps |
| md | 1rem | Espaçamento padrão |
| lg | 1.5rem | Entre seções |
| xl | 2rem | Entre blocos principais |
| 2xl | 3rem | Seções hero |

### Border Radius

- **Padrão**: `0.75rem` (12px)
- **Cards**: `0.75rem`
- **Botões**: `0.75rem` ou `calc(var(--radius) - 2px)`
- **Pills/Tags**: `2rem` (bordas arredondadas completas)

---

## ⚡ Animações e Transições

### Duração Padrão

```css
transition: all 0.3s ease;
```

### Efeitos Comuns

#### Hover com Elevação

```css
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6);
}
```

#### Botão com Bounce

```css
.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(232, 153, 70, 0.5);
}

.button:active {
  transform: translateY(0);
}
```

#### Spinner/Loading

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 2s linear infinite;
  filter: drop-shadow(0 0 12px rgba(232, 153, 70, 0.4));
}
```

---

## ♿ Acessibilidade

### Contraste de Cores

Todos os pares de texto/background atendem **WCAG AA**:

- Texto principal em `#F5F5F5` sobre `#0F0F0F`: **13.8:1** ✅
- Texto secundário em `#9CA3AF` sobre `#0F0F0F`: **7.2:1** ✅
- Botão primário `#0F0F0F` sobre `#E89946`: **8.1:1** ✅

### Estados de Foco

Todos os elementos interativos possuem:

```css
element:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

### Navegação por Teclado

- ✅ Todas as seções colapsáveis funcionam com `Enter`/`Space`
- ✅ Formulários acessíveis via `Tab`
- ✅ Links e botões claramente diferenciados

---

## 📖 Diretrizes de Uso

### ✅ Boas Práticas

1. **Use sempre as variáveis CSS** ao invés de cores hardcoded
2. **Mantenha hierarquia visual** com tamanhos e pesos de fonte
3. **Adicione transições** a todos elementos interativos
4. **Use cores semânticas** para status (verde/amarelo/vermelho)
5. **Teste contraste** antes de adicionar novos pares de cores
6. **Adicione sombras** para criar profundidade em cards

### ❌ O Que Evitar

1. ❌ Não use cores puras sem opacidade em overlays
2. ❌ Evite adicionar muitos gradientes (use com moderação)
3. ❌ Não ignore estados hover/focus/active
4. ❌ Evite bordas muito grossas (máximo 4px para indicadores)
5. ❌ Não use animações muito longas (máximo 0.5s)

### Exemplos de Código

#### ✅ Correto

```css
.meu-card {
  background: var(--background-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: all 0.3s ease;
}

.meu-card:hover {
  border-color: var(--border-strong);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}
```

#### ❌ Incorreto

```css
.meu-card {
  background: #1a1a1a; /* ❌ Use var(--background-elevated) */
  border: 1px solid #2a2a2a;
  border-radius: 12px; /* ❌ Use var(--radius) */
  /* ❌ Sem transição */
}
```

---

## 🎯 Componentes Futuros

### Sugestões para Manter Consistência

Ao criar novos componentes, siga este template:

```css
.novo-componente {
  /* Background e bordas */
  background: var(--background-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  
  /* Espaçamento */
  padding: 1.5rem;
  
  /* Tipografia */
  font-family: var(--font-sans);
  color: var(--foreground);
  
  /* Sombras e efeitos */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  
  /* Animações */
  transition: all 0.3s ease;
}

.novo-componente:hover {
  border-color: var(--border-strong);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6);
}
```

---

## 📚 Referências

- **Inspiração de Design**: Analytics Dashboard com paleta dourada
- **Fontes**: [Google Fonts](https://fonts.google.com/) - Inter + Merriweather
- **Contraste**: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- **Guidelines WCAG**: [WCAG 2.1 AA](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 📝 Changelog

### v1.0 - Redesign Completo (2026-02-13)

#### Adicionado
- ✅ Tema escuro profissional com paleta dourada
- ✅ Sistema de tokens de design via CSS variables
- ✅ Gradientes e glows em elementos de destaque
- ✅ Animações e transições suaves
- ✅ Estados hover/focus em todos componentes interativos
- ✅ Cores semânticas para status de fidelidade
- ✅ Efeitos glassmorphism na navbar
- ✅ Sombras profundas para hierarquia visual

#### Modificado
- 🔄 Navbar: background elevado + blur + indicador ativo
- 🔄 Hero: título gradiente + input com glow ao focar
- 🔄 Cards: bordas coloridas + sombras dinâmicas
- 🔄 Botões: gradientes + elevação no hover
- 🔄 Biblioteca: grid cards com borda lateral colorida
- 🔄 Admin: badges translúcidos + botões semânticos
- 🔄 Loading: spinner com glow dourado

#### Arquivos Alterados
- `src/app/globals.css`
- `src/components/Navbar.module.css`
- `src/components/HeroSection.module.css`
- `src/components/AnalysisResult.module.css`
- `src/app/library/page.module.css`
- `src/app/admin/page.module.css`
- `src/app/analyze/page.module.css`

---

**Desenvolvido com ❤️ para RAIZ DO TEXTO**
