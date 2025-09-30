const getDeadlineInfo = (deadline) => {
    if (!deadline) return { text: '締切なし', color: 'text-gray-500' };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);

    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: '締切超過', color: 'font-bold text-gray-300' };
    if (diffDays === 0) return { text: '本日まで', color: 'font-bold text-red-500' };
    if (diffDays <= 3) return { text: `あと${diffDays}日`, color: 'font-bold text-red-500' };
    if (diffDays <= 5) return { text: `あと${diffDays}日`, color: 'font-bold text-yellow-600' };

    const month = deadlineDate.getMonth() + 1;
    const day = deadlineDate.getDate();
    return { text: `${month}/${day} まで`, color: 'text-gray-500' };
};

export default function TaskCard ({ task, onDelete, onComplete }) {

    const cardStyle = task.completed
    ? "opacity-0 scale-95"
    : "opacity-100 scale-100";

    const titleStrikeClass = task.isCompleting ? "animate-strike" : "";

    const deadlineInfo = getDeadlineInfo(task.deadline);

    return(
        <li className={`bg-white p-4 rounded-lg shadow-md transition-all duration-700 ease-in-out ${cardStyle}`}>
            <p className={"text-lg font-semibold mb-2"}>
                <span className={`strikethrough ${titleStrikeClass}`}>
                    {task.title}
                </span>
            </p>
            <div className={"text-sm text-gray-500 mb-4"}>
                <span>優先度: {"🔥".repeat(task.priority)}</span>
                / <span className={deadlineInfo.color}>{deadlineInfo.text}</span>
            </div>

            <div className={"flex justify-between items-center"}>
                <button
                    onClick={() => onDelete(task.id)}
                    className={"bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"}
                    >削除</button>
                <button
                    onClick={() => onComplete(task.id)}
                    disabled={task.isCompleting}
                    className={"bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm disabled:bg-gray-400"}>完了</button>
            </div>
        </li>
    );
}