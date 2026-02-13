# 🤝 Guia de Contribuição - RAIZ DO TEXTO

Obrigado por considerar contribuir com o **RAIZ DO TEXTO**! Este documento fornece diretrizes para garantir que as contribuições mantenham a qualidade e consistência do projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Padrões de Código](#padrões-de-código)
- [Design System](#design-system)
- [Commits](#commits)
- [Pull Requests](#pull-requests)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Funcionalidades](#sugerir-funcionalidades)

## 📜 Código de Conduta

Este projeto segue um código de conduta baseado em respeito mútuo. Esperamos que todos os colaboradores:

- Sejam respeitosos e inclusivos
- Aceitem críticas construtivas
- Foquem no que é melhor para a comunidade
- Mostrem empatia com outros membros

## 🚀 Como Contribuir

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub
# Depois clone seu fork
git clone https://github.com/seu-usuario/bible-main.git
cd bible-main
```

### 2. Crie uma Branch

```bash
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-bug
```

**Convenções de nomenclatura:**
- `feature/` - Nova funcionalidade
- `fix/` - Correção de bug
- `docs/` - Documentação
- `style/` - Mudanças de estilo/formatação
- `refactor/` - Refatoração de código
- `test/` - Adição ou correção de testes
- `chore/` - Tarefas de manutenção

### 3. Instale Dependências

```bash
npm install
```

### 4. Configure o Ambiente

```bash
cp .env.example .env
# Edite o .env com suas credenciais
```

### 5. Faça suas Alterações

- Escreva código limpo e legível
- Siga os padrões de código (abaixo)
- Teste suas alterações localmente
- Adicione comentários quando necessário

### 6. Teste Localmente

```bash
npm run dev
# Acesse http://localhost:3000
```

### 7. Commit e Push

```bash
git add .
git commit -m "feat: adiciona nova funcionalidade X"
git push origin feature/nome-da-feature
```

### 8. Abra um Pull Request

- Vá para o repositório original no GitHub
- Clique em "New Pull Request"
- Selecione sua branch
- Preencha o template de PR

## 💻 Padrões de Código

### TypeScript

```typescript
// ✅ Correto: Use tipos explícitos
interface AnalysisProps {
  phrase: string;
  verse: string;
}

function analyze(props: AnalysisProps): void {
  // ...
}

// ❌ Errado: Evite 'any'
function analyze(props: any) {
  // ...
}
```

### React Components

```tsx
// ✅ Correto: Functional components com TypeScript
import { FC } from 'react';
import styles from './Component.module.css';

interface ComponentProps {
  title: string;
  onAction: () => void;
}

export const Component: FC<ComponentProps> = ({ title, onAction }) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <button onClick={onAction}>Ação</button>
    </div>
  );
};

// ❌ Errado: Sem tipos, inline styles
export default function Component({ title, onAction }) {
  return (
    <div style={{ padding: '20px' }}>
      <h2>{title}</h2>
    </div>
  );
}
```

### CSS Modules

```css
/* ✅ Correto: Use variáveis CSS */
.container {
  background: var(--background-elevated);
  color: var(--foreground);
  border-radius: var(--radius);
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.container:hover {
  border-color: var(--border-strong);
}

/* ❌ Errado: Valores hardcoded */
.container {
  background: #1a1a1a;
  color: #f5f5f5;
  border-radius: 12px;
  padding: 24px;
}
```

### Estrutura de Arquivos

```
src/
├── app/
│   ├── page.tsx              # Página
│   └── page.module.css       # Estilos da página
├── components/
│   ├── Component/
│   │   ├── index.tsx         # Exportação
│   │   ├── Component.tsx     # Componente
│   │   └── Component.module.css
│   └── OtherComponent.tsx    # Componente simples
└── lib/
    └── utils.ts              # Utilitários
```

### Nomenclatura

- **Componentes**: PascalCase (`AnalysisResult.tsx`)
- **Arquivos CSS**: kebab-case ou PascalCase.module.css
- **Funções**: camelCase (`analyzePhrase`)
- **Constantes**: UPPER_SNAKE_CASE (`API_KEY`)
- **Interfaces**: PascalCase com sufixo Props ou Type (`AnalysisProps`)

## 🎨 Design System

### Regras Obrigatórias

1. **Sempre use variáveis CSS** do `globals.css`:
   ```css
   /* ✅ */
   color: var(--foreground);
   
   /* ❌ */
   color: #F5F5F5;
   ```

2. **Sempre adicione transições**:
   ```css
   .element {
     transition: all 0.3s ease;
   }
   ```

3. **Use border-radius padrão**:
   ```css
   border-radius: var(--radius);
   ```

4. **Adicione estados hover/focus**:
   ```css
   .button:hover {
     transform: translateY(-2px);
   }
   
   .input:focus {
     border-color: var(--primary);
   }
   ```

5. **Mantenha contraste WCAG AA** (4.5:1 para texto normal)

### Consulte a Documentação

- [DESIGN.md](./DESIGN.md) - Documentação completa
- [DESIGN-QUICKREF.md](./DESIGN-QUICKREF.md) - Referência rápida
- Use snippets do VS Code (`.vscode/snippets.code-snippets`)

## 📝 Commits

Siga a convenção [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(escopo): descrição curta

Descrição mais detalhada (opcional)

BREAKING CHANGE: descrição da mudança (se aplicável)
```

### Tipos

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação, ponto e vírgula faltando, etc
- `refactor`: Refatoração de código
- `test`: Adição de testes
- `chore`: Manutenção, atualização de dependências

### Exemplos

```bash
feat(analysis): adiciona exportação em PDF
fix(navbar): corrige highlight da página ativa
docs(design): atualiza paleta de cores
style(button): ajusta padding do botão primário
refactor(api): simplifica lógica de fallback de IA
```

## 🔄 Pull Requests

### Checklist Antes de Abrir PR

- [ ] Código segue os padrões estabelecidos
- [ ] Usa variáveis CSS do design system
- [ ] Componentes possuem tipos TypeScript
- [ ] Todos os imports estão corretos
- [ ] Código foi testado localmente
- [ ] Não há console.logs esquecidos
- [ ] CSS tem transições e estados hover
- [ ] Contraste de cores está adequado
- [ ] Funciona em mobile (se aplicável)
- [ ] README ou docs foram atualizados (se necessário)

### Template de PR

```markdown
## Descrição
Breve descrição das mudanças

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## Como Testar
1. Passo 1
2. Passo 2
3. Resultado esperado

## Screenshots (se aplicável)
[adicione imagens]

## Checklist
- [ ] Código segue padrões do projeto
- [ ] Self-review realizado
- [ ] Comentários adicionados onde necessário
- [ ] Documentação atualizada
- [ ] Sem warnings no console
```

## 🐛 Reportar Bugs

### Template de Issue para Bugs

```markdown
**Descrição do Bug**
Descrição clara e concisa do que é o bug.

**Como Reproduzir**
Passos para reproduzir:
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

**Comportamento Esperado**
O que deveria acontecer.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente:**
 - OS: [ex: Windows 11]
 - Browser: [ex: Chrome 120]
 - Versão do Node: [ex: 20.10.0]

**Contexto Adicional**
Qualquer outra informação relevante.
```

## 💡 Sugerir Funcionalidades

### Template de Issue para Features

```markdown
**A funcionalidade está relacionada a um problema?**
Descrição clara do problema. Ex: "Sempre fico frustrado quando [...]"

**Descreva a solução que você gostaria**
Descrição clara e concisa da solução desejada.

**Descreva alternativas consideradas**
Outras soluções ou funcionalidades que você considerou.

**Contexto Adicional**
Screenshots, mockups, referências, etc.
```

## 🎯 Áreas que Precisam de Ajuda

Sempre há espaço para contribuições em:

- 📱 Melhorias de responsividade mobile
- ♿ Acessibilidade (ARIA labels, navegação por teclado)
- 🧪 Testes automatizados
- 📖 Documentação e tradução
- 🎨 Componentes reutilizáveis
- ⚡ Otimizações de performance
- 🔒 Segurança

## 📞 Dúvidas?

- Abra uma [Discussion](https://github.com/seu-usuario/bible-main/discussions)
- Ou uma [Issue](https://github.com/seu-usuario/bible-main/issues) com a tag `question`

## 🙏 Agradecimentos

Obrigado por contribuir com o **RAIZ DO TEXTO**! Cada contribuição ajuda a tornar este projeto melhor.

---

**Desenvolvido com ❤️ pela comunidade**
