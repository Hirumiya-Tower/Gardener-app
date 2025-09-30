import {useEffect, useRef, useState} from "react";

export default function PromoteTaskModal ({ isOpen, task, onClose, onPromote }){
    const dialogRef = useRef(null);
    const[priority, setPriority] = useState("2");
    const[deadline, setDeadline] = useState("");

    useEffect(() => {
        if (isOpen){
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onPromote({ ...task, priority, deadline});
        onClose();
    };

    return(
        <dialog ref={dialogRef} className={"p-8 rounded-lg shadow-xl"} onClose={onClose}>
            <h3 className={"text-2xl font-bold mb-4"}>タスクをカード化</h3>
            <p className={"mb-4 text-lg"}><span className={"font-bold"}>{task?.title}</span></p>

            <form onSubmit={handleSubmit}>
                <div className={"mb-4"}>
                    <label htmlFor={"priority"} className={"block mb-2"}>優先度</label>
                    <select id={"priority"} value={priority} onChange={e => setPriority(e.target.value)} className={"w-full p-2 border rounded"}>
                        <option value={3}>🔥🔥🔥</option>
                        <option value={2}>🔥🔥</option>
                        <option value={1}>🔥</option>
                    </select>
                </div>

                <div className={"mb-6"}>
                    <label htmlFor={"deadline"} className={"block mb-2"}>締め切り</label>
                    <input type={"date"} id={"deadline"} value={deadline} onChange={e => setDeadline(e.target.value)} placeholder={"例: 今日の夕方"} className={"w-full p-2 border rounded"}/>
                </div>

                <div className={"flex justify-end gap-4"}>
                    <button type={"button"} onClick={onClose} className={"bg-gray-300 px-4 py-2 rounded"}>キャンセル</button>
                    <button type={"submit"} className={"bg-blue-500 text-white px-4 py-2 rounded"}>作成</button>
                </div>
            </form>
        </dialog>
    );
}