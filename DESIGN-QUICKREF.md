# 🎨 Guia Rápido de Referência - Design System

> Referência rápida para desenvolvimento com o tema RAIZ DO TEXTO

## 🎯 Cores Essenciais

```css
/* Copie e cole conforme necessário */

/* Backgrounds */
background: var(--background);           /* #0F0F0F - Fundo principal */
background: var(--background-elevated);  /* #1A1A1A - Cards/painéis */
background: var(--background-hover);     /* #242424 - Hover states */

/* Texto */
color: var(--foreground);          /* #F5F5F5 - Texto principal */
color: var(--muted-foreground);    /* #9CA3AF - Texto secundário */

/* Acentos */
color: var(--primary);             /* #E89946 - Dourado principal */
color: var(--accent);              /* #D4802F - Laranja profundo */

/* Semânticas */
color: var(--success);             /* #4ADE80 - Verde */
color: var(--warning);             /* #FBBF24 - Amarelo */
color: var(--error);               /* #F87171 - Vermelho */

/* Bordas */
border: 1px solid var(--border);         /* #2A2A2A - Sutil */
border: 1px solid var(--border-strong);  /* #3A3A3A - Destaque */
```

## 📦 Templates Prontos

### Card Básico

```css
.card {
  background: var(--background-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

.card:hover {
  border-color: var(--border-strong);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6);
}
```

### Botão Primário

```css
.button-primary {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: var(--primary-foreground);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(232, 153, 70, 0.3);
}

.button-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(232, 153, 70, 0.5);
}
```

### Input/Campo de Texto

```css
.input {
  background: var(--background-elevated);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  padding: 1rem;
  color: var(--foreground);
  font-family: var(--font-sans);
  transition: all 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(232, 153, 70, 0.2);
}
```

### Badge/Tag

```css
.badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
}

.badge-success {
  color: var(--success);
  background: rgba(74, 222, 128, 0.15);
}

.badge-warning {
  color: var(--warning);
  background: rgba(251, 191, 36, 0.15);
}

.badge-error {
  color: var(--error);
  background: rgba(248, 113, 113, 0.15);
}
```

### Título com Gradiente

```css
.title-gradient {
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Container com Glow

```css
.glow-container {
  position: relative;
}

.glow-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(232, 153, 70, 0.1), transparent);
  pointer-events: none;
}
```

## 🎨 Efeitos Especiais

### Glassmorphism (Navbar)

```css
.glass {
  background: var(--background-elevated);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
```

### Spinner com Glow

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 2s linear infinite;
  color: var(--primary);
  filter: drop-shadow(0 0 12px rgba(232, 153, 70, 0.4));
}
```

### Hover com Escala

```css
.scale-hover {
  transition: all 0.3s ease;
}

.scale-hover:hover {
  transform: scale(1.05);
}
```

## 📏 Espaçamentos Rápidos

```css
/* Padding */
padding: 0.5rem;   /* Pequeno */
padding: 1rem;     /* Médio */
padding: 1.5rem;   /* Grande (padrão cards) */
padding: 2rem;     /* Extra grande */

/* Gap */
gap: 0.75rem;      /* Tags/badges */
gap: 1rem;         /* Listas */
gap: 1.5rem;       /* Cards grid */
gap: 2rem;         /* Seções */

/* Margin */
margin-bottom: 1rem;
margin-bottom: 1.5rem;
margin-bottom: 2rem;
```

## 🔤 Tipografia Rápida

```css
/* Títulos */
h1 { font-family: var(--font-serif); font-size: 3.5rem; font-weight: 900; }
h2 { font-family: var(--font-serif); font-size: 2.5rem; font-weight: 700; }
h3 { font-family: var(--font-serif); font-size: 2rem; font-weight: 700; }

/* Corpo */
body { font-family: var(--font-sans); font-size: 1rem; line-height: 1.6; }

/* Small text */
.small { font-size: 0.875rem; }
.tiny { font-size: 0.75rem; }
```

## 🎯 Sombras por Nível

```css
/* Nível 1 - Sutil */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

/* Nível 2 - Médio (padrão) */
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);

/* Nível 3 - Elevado */
box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6);

/* Nível 4 - Máximo */
box-shadow: 0 16px 32px rgba(0, 0, 0, 0.7);

/* Com cor (hover em primário) */
box-shadow: 0 8px 20px rgba(232, 153, 70, 0.5);
```

## ⚡ Transições

```css
/* Padrão universal */
transition: all 0.3s ease;

/* Específicas */
transition: transform 0.3s ease;
transition: opacity 0.2s ease;
transition: box-shadow 0.3s ease;
```

## 🌈 Opacidades para Overlays

```css
/* Backgrounds translúcidos */
background: rgba(74, 222, 128, 0.15);   /* Success overlay */
background: rgba(251, 191, 36, 0.15);   /* Warning overlay */
background: rgba(248, 113, 113, 0.15);  /* Error overlay */
background: rgba(232, 153, 70, 0.2);    /* Primary overlay */

/* Glows */
box-shadow: 0 0 20px rgba(232, 153, 70, 0.3);
```

## 📱 Breakpoints Responsivos

```css
/* Mobile first */
@media (min-width: 768px) {
  /* Tablet */
}

@media (min-width: 1024px) {
  /* Desktop */
}

@media (min-width: 1280px) {
  /* Large desktop */
}
```

## ✅ Checklist de Novo Componente

Ao criar um novo componente, garanta:

- [ ] Usa variáveis CSS (`var(--*)`) ao invés de cores hardcoded
- [ ] Tem `transition: all 0.3s ease`
- [ ] Possui estados `:hover` e `:focus`
- [ ] Usa `border-radius: var(--radius)`
- [ ] Tem sombra apropriada ao nível de elevação
- [ ] Texto tem contraste adequado (WCAG AA)
- [ ] Funciona com navegação por teclado
- [ ] É responsivo (mobile-first)

## 🚀 Quick Start

1. **Importe as variáveis globais**:
   ```tsx
   import '@/app/globals.css'
   ```

2. **Use CSS Modules para componentes**:
   ```tsx
   import styles from './Component.module.css'
   ```

3. **Sempre use variáveis CSS**:
   ```css
   /* ✅ Correto */
   .element { color: var(--foreground); }
   
   /* ❌ Errado */
   .element { color: #F5F5F5; }
   ```

4. **Adicione transições**:
   ```css
   .interactive {
     transition: all 0.3s ease;
   }
   ```

5. **Teste acessibilidade**:
   - Navegue com `Tab`
   - Teste em modo escuro (já é dark mode!)
   - Verifique contraste de cores

---

**💡 Dica**: Mantenha este arquivo aberto enquanto desenvolve!
