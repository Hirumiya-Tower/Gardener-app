export default function TaskInputForm () {
    return(
        <div className={`flex gap-2 mb-8`}>
            <input
                type={`text`}
                placeholder={`Enter a new task...`}
                className={`flex-grow p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none`}/>
            <button className={`bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-600`}>↑</button>
        </div>
    );
}