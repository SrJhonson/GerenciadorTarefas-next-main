"use client";

// Tipo para a tarefa
type Tarefa = {
  id: number;
  nome: string;
  concluida: boolean;
};

// Interface para as propriedades do componente Tarefa
interface TarefaProps {
  tarefa: Tarefa;
  onConcluir: (id: number) => void;
  onExcluir: (id: number) => void;
}

// Componente funcional Tarefa
// Componente Tarefa
export default function Tarefa({ tarefa, onConcluir, onExcluir }: TarefaProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={tarefa.concluida}
        onChange={() => onConcluir(tarefa.id)}
      />
      <span className={tarefa.concluida ? 'concluida' : ''}>
        {tarefa.nome} 
      </span>
      <button onClick={() => onExcluir(tarefa.id)}>Excluir</button>
    </li>
  );
}


