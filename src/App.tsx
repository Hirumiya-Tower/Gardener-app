import { useState, useEffect } from 'react'
import TaskSea from "./components/TaskSea.jsx";
import TaskCard from "./components/TaskCard.jsx";
import PromoteTaskModal from "./components/PromoteTaskModal.jsx";

type CardTask = {
    id: number;
    title: string;
    priority: number;
    deadline: string;
    isCompleting?: boolean;
    completed?: boolean;
}

const initialSeaTasks = [
    {id: 101, title: "https://github.com/Hirumiya-Tower/Gardener-appにアクセスする"},
    {id: 102, title: "Readmeを確認する"},
    {id: 103, title: "α版の試用を開始する"},
]

const initialCardTasks = [
    {id: 1, title: "さあ、はじめよう！", priority: 3, deadline: null}
]

export default  function App() {

    const [seaTasks, setSeaTasks] = useState(() => {
        const savedSeaTasks = localStorage.getItem('seaTasks');
        return savedSeaTasks ? JSON.parse(savedSeaTasks) : initialSeaTasks;
    });

    const [cardTasks, setCardTasks] = useState<CardTask[]>(() => {
        const savedCardTasks = localStorage.getItem('cardTasks');
        return savedCardTasks ? JSON.parse(savedCardTasks) : initialCardTasks;
    });

    const [modalState, setModalState] = useState({isOpen: false, taskToPromote: null});

   const handleAddSeaTask = (title) => {
       const newSeaTask = { id: Date.now(), title};
       setSeaTasks([...seaTasks, newSeaTask]);
   } ;

   const handleOpenModal = (task) => {
       setModalState({isOpen: true, taskToPromote: task});
   };

   const handleCloseModal = () => {
       setModalState({isOpen: false, taskToPromote: null})
   }

   const handlePromoteTask = (promotedTask) => {
       const newCardTask = {...promotedTask, completed: false}
       setCardTasks([...cardTasks, newCardTask]);
       setSeaTasks(seaTasks.filter(task => task.id !== promotedTask.id));
   }

    const handleDeleteTask = (taskId) => {
       setCardTasks(cardTasks.filter(task => task.id !== taskId))
    }

    const handleCompleteTask = (taskId) => {
        setCardTasks(prevTasks =>
            prevTasks.map(task =>
            task.id === taskId ? { ...task, isCompleting: true} : task
            )
        );

        setTimeout(() => {
            setCardTasks(prevTasks =>
                prevTasks.map(task =>
                task.id === taskId ? { ...task, completed: true} : task
                )
            );
        }, 500);

            setTimeout(() => {
                setCardTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
            }, 1200);
    };

    useEffect(() => {
        localStorage.setItem('seaTasks', JSON.stringify(seaTasks));
        localStorage.setItem('cardTasks', JSON.stringify(cardTasks));
    }, [seaTasks, cardTasks]);

    return(
        <div className={"min-h-screen bg-gray-100"}>
            <div className={"container mx-auto p-4 md:p-8"}>

                {/*タイトル*/}
                <h1 className={"text-center text-4xl font-bold mb-8"}>
                    Gardener
                </h1>

                <div className={"grid grid-cols-1 lg:grid-cols-2 gap-8"}>
                    {/*タスクの海*/}
                    <div className={"sea-area"}>
                        <h2 className={"text-2xl font-semibold mb-4"}>Task Sea</h2>
                        <TaskSea
                            tasks={seaTasks}
                            onAddTask={handleAddSeaTask}
                            onPromoteClick={handleOpenModal}
                            />
                    </div>

                    {/*タスクリスト*/}
                    <div className={"card-area"}>
                        <h2 className={"text-2xl font-semibold mb-4"}>Task List</h2>
                        <ul className={"grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"}>
                            {[...cardTasks]
                                .sort((a, b) => {
                                    if (!a.deadline) return 1;
                                    if (!b.deadline) return -1;
                                    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
                                })
                                .map(task => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        onDelete={handleDeleteTask}
                                        onComplete={handleCompleteTask}
                                    />
                                ))}
                        </ul>
                    </div>
                </div>

                {/*タスク作成モーダル*/}
                <PromoteTaskModal
                    isOpen={modalState.isOpen}
                    task={modalState.taskToPromote}
                    onClose={handleCloseModal}
                    onPromote={handlePromoteTask}
                    />
            </div>
        </div>
    )
}

