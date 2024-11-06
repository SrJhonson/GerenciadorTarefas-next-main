"use client";

import { useState } from 'react';
import Tarefa from './components/Tarefa';

type Tarefa = {
  id: number;
  nome: string;
  concluida: boolean;
};

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    // { id: 1, nome: 'Fazer Compras', concluida: false },
    // { id: 2, nome: 'Estudar Next.js', concluida: true },
  ]);
  
  const [tarefasConcluidas, setTarefasConcluidas] = useState<Tarefa[]>([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  // Adicionar nova tarefa
  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      const novoId = Date.now();
      setTarefas([
        ...tarefas,
        { id: novoId, nome: novaTarefa, concluida: false },
      ]);
      setNovaTarefa('');
    }
  };

  // Marcar tarefa como concluída ou desmarcar
  const concluirTarefa = (id: number) => {
    setTarefas(tarefas.map(tarefa =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ));
  };

  // Excluir tarefa
  const excluirTarefa = (id: number) => {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  };

  // Função para concluir todas as tarefas selecionadas
  const concluirTodasTarefas = () => {
    const tarefasConcluidasAgora = tarefas.filter(tarefa => tarefa.concluida);
    setTarefasConcluidas([...tarefasConcluidas, ...tarefasConcluidasAgora]);
    setTarefas(tarefas.filter(tarefa => !tarefa.concluida));
  };

  return (
    <div>
      <h1>Minhas Tarefas DSM 3</h1>

      <form onSubmit={(e) => { e.preventDefault(); adicionarTarefa(); }}>
        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          aria-label="Adicionar nova tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>

      <button onClick={concluirTodasTarefas}>
        Concluir Tarefas Marcadas
      </button>

      <h2>Tarefas Pendentes</h2>
      <ul>
        {tarefas.map(tarefa => (
          <Tarefa
            key={tarefa.id}
            tarefa={tarefa}
            onConcluir={concluirTarefa}
            onExcluir={excluirTarefa}
          />
        ))}
      </ul>

      <h2>Tarefas Concluídas</h2>
      <ul>
        {tarefasConcluidas.map(tarefa => (
          <Tarefa
            key={tarefa.id}
            tarefa={tarefa}
            onConcluir={concluirTarefa}
            onExcluir={excluirTarefa}
          />
        ))}
      </ul>
    </div>
  );
}
