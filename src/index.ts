import * as readlineSync from "readline-sync";
import { TaskService, prisma } from "./services/TaskService";

const taskService = new TaskService();

async function mainMenu() {
  while (true) {
    //--------------------MENU DE TAREFAS--------------------
    console.log("\n--- Menu de Tarefas ---");
    console.log("1. Criar Tarefa");
    console.log("2. Listar todas as Tarefas");
    console.log("3. Marcar Tarefa como Concluída");
    console.log("4. Deletar Tarefa");
    console.log("5. Sair");

    const choice = readlineSync.question(`\nEscolha uma opção: `);

    switch (choice) {
      case "1":
        await createTask();
        break;
      case "2":
        await listTasks();
        break;
      case "3":
        await completeTask();
        break;
      case "4":
        await deleteTask();
        break;
      case "5":
        console.log("Desconectando do banco de dados e saindo...");
        await prisma.$disconnect();
        return;
      default:
        console.log("Opção inválida! Tente novamente.");
    }
  }
}

//--------------------CRIAR TAREFA--------------------

async function createTask() {
  let title = "";
  while (true) {
    title = readlineSync.question("Digite o titulo da tarefa: ");
    if (title.trim() !== "") {
      break;
    } else {
      console.log("O título não pode ser vazio. Por favor, tente novamente.");
    }
  }

  let description = "";
  while (true) {
    description = readlineSync.question("Digite a descricao da tarefa: ");
    if (description.trim() !== "") {
      break;
    } else {
      console.log(
        "A descrição não pode ser vazia. Por favor, tente novamente."
      );
    }
  }

  const newTask = await taskService.createTask(title, description);
  console.log(
    `\nTarefa "${newTask.title}" criada com sucesso! ID: ${newTask.id}`
  );
}

//--------------------LISTAR TAREFAS--------------------

async function listTasks() {
  const tasks = await taskService.getAllTasks();
  if (tasks.length === 0) {
    console.log("\nNenhuma tarefa cadastrada.");
    return;
  }
  console.log("\n--- Lista de Tarefas ---");
  tasks.forEach((task) => {
    console.log(
      `ID: ${task.id} | Título: ${task.title} | Descrição: ${
        task.description
      } | Concluída: ${task.completed ? "Sim" : "Não"}`
    );
  });
}

//--------------------COMPLETAR TAREFA--------------------

async function completeTask() {
  // Listar tarefas para o usuário escolher
  const tasks = await taskService.getAllTasks();
  if (tasks.length === 0) {
    console.log("\nNenhuma tarefa cadastrada.");
    return;
  }
  console.log("\n--- Lista de Tarefas ---");
  tasks.forEach((task) => {
    console.log(
      `ID: ${task.id} | Título: ${task.title} | Descrição: ${
        task.description
      } | Concluída: ${task.completed ? "Sim" : "Não"}`
    );
  });
  // Solicitar o ID da tarefa a ser marcada como concluída
  const id = parseInt(
    readlineSync.question(
      `\nDigite o ID da tarefa para marcar como concluida: `
    ),
    10
  );
  const task = await taskService.getTaskById(id);

  if (task) {
    taskService.updateTask(id, task.title, task.description, true);
    console.log(`\nTarefa "${task.title}" marcada como concluída.`);
  } else {
    console.log("\nTarefa não encontrada.");
  }
}

//--------------------DELETAR TAREFA--------------------

async function deleteTask() {
  // Listar tarefas para o usuário escolher
  const tasks = await taskService.getAllTasks();
  if (tasks.length === 0) {
    console.log("\nNenhuma tarefa cadastrada.");
    return;
  }
  console.log("\n--- Lista de Tarefas ---");
  tasks.forEach((task) => {
    console.log(
      `ID: ${task.id} | Título: ${task.title} | Descrição: ${
        task.description
      } | Concluída: ${task.completed ? "Sim" : "Não"}`
    );
  });

  const id = parseInt(
    readlineSync.question(`\nDigite o ID da tarefa que deseja deletar:`),
    10
  );

  const success = await taskService.deleteTask(id);

  if (true) {
    console.log(`\nTarefa com ID ${id} deletada com sucesso.`);
  } else {
    console.log("\nTarefa não encontrada.");
  }
}

//--------------------INICIA A APLICAÇÃO--------------------
mainMenu()
  .catch((e) => {
    // Captura erros inesperados
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Garante que o prisma desconecte não importa o que aconteça
    await prisma.$disconnect();
  });
