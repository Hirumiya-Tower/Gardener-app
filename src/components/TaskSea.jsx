import {useState} from "react";

export default function TaskSea({tasks, onAddTask, onPromoteClick}){
    const [inputValue, setInputValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        if(inputValue.trim() === "") return;

        onAddTask(inputValue);
        setInputValue("")
    };

    return(
        <div className={"bg-white p-4 rounded-lg shadow-md"}>
            <form onSubmit={handleSubmit} className={"flex gap-2 mb-4"}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={"タスクを投げ込む"}
                    className={"flex-grow p-2 border rounded-lg"}
                    />
                <button type={"submit"} className={"bg-blue-500 text-white px-4 py-2 rounded-lg"}>追加</button>
            </form>

            <ul>
                {tasks.map(task => (
                    <li key={task.id} className="flex justify-between items-center p-2 border-b">

                        <span className="break-words mr-2">
                            {task.title}
                        </span>

                        <button
                            onClick={() => onPromoteClick(task)}
                            className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 hover:bg-green-600"
                        >
                            <span className="relative bottom-0.5">
                                +
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )

}