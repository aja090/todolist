// الحصول على العناصر من DOM
const todoList = document.getElementById("todo-list") // القائمة التي تعرض المهام
const addTodo = document.getElementById("add-todo") // الزر لإضافة مهمة جديدة

// الحصول على تاريخ اليوم
let today = new Date()
let day = today.getDate() // استخراج اليوم من التاريخ الحالي
let month = today.getMonth() + 1 // استخراج الشهر (يبدأ من 0 لذا نضيف 1)
let year = today.getFullYear() // استخراج السنة

// جلب المهام من Local Storage أو تعيين قائمة افتراضية إذا لم تكن موجودة
let tasks = JSON.parse(localStorage.getItem("tasks")) || [
    // {
    //     "name": "امتحان كلية",
    //     "date": `${day}/${month}/${year}`,
    //     "isDone": false
    // },
    // {
    //     "name": "بحث تخرج",
    //     "date": `${day}/${month}/${year}`,
    //     "isDone": false
    // },
    // {
    //     "name": "الكورس البرمجي",
    //     "date": `${day}/${month}/${year}`,
    //     "isDone": false
    // }
]

// دالة لحفظ المهام في Local Storage
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks)) // تحويل المهام إلى نص وحفظها
}
// دالة لعرض المهام على الصفحة
let fillThePage = () => {
        todoList.innerHTML = ""; // تفريغ القائمة لتجنب التكرار

        if (tasks.length === 0) {
            // إذا كانت القائمة فارغة، نعرض رسالة داخل مربع
            todoList.innerHTML = `
            <div class="empty-message">
                <p>✨ لا توجد مهام حالياً. أضف مهام جديدة للبدء! ✨</p>
            </div>
        `;
        }

        // التكرار على كل المهام وإضافتها إلى الـ DOM
        for (let task = 0; task < tasks.length; task++) {
            const taskClass = tasks[task].isDone ? "done" : "";
            const buttonText = tasks[task].isDone ? "إلغاء" : "✔️";
            const buttonTextClass = tasks[task].isDone ? "closeFinish" : "";

            todoList.innerHTML += `
        <li class="todo ${taskClass}">
            <div class="btn">
                <button onclick="editTodo(${task})" class="edit">✍🏻</button>
                <button onclick="toogleTodoCompletion(${task})" class="finish ${buttonTextClass}">${buttonText}</button>
                <button onclick="deleteTodo(${task})" class="delete">❌</button>
            </div>
            <h1 style="font-size: 1.5rem; font-weight: 600;">${tasks[task].name}</h1>
            <h1 class="date">${tasks[task].date} <span>🗓️</span></h1>
        </li>
        `;
        }
    };
fillThePage() // استدعاء الدالة لأول مرة لعرض المهام

// عند الضغط على زر "إضافة مهمة جديدة"
addTodo.addEventListener("click", () => {
    const task = prompt("أدخل المهمة الجديدة:") // مطالبة المستخدم بإدخال اسم المهمة

    // إذا كان الإدخال فارغًا، يتم التوقف
    if (!task) return alert("لا يمكن إضافة مهمة فارغة!")

    // إنشاء كائن المهمة الجديدة
    let newTask = {
        "name": task, // اسم المهمة من المدخل
        "date": `${day}/${month}/${year}`, // التاريخ الحالي
        "isDone": false // المهمة تبدأ بحالة غير مكتملة
    }

    tasks.push(newTask) // إضافة المهمة إلى قائمة المهام
    saveTasksToLocalStorage() // حفظ المهام في Local Storage
    fillThePage() // إعادة ملء الصفحة لعرض المهمة الجديدة
})

// حذف مهمة معينة
function deleteTodo(index) {
    const isConfirmed = confirm(`هل فعلاً تريد حذف هذه المهمة: ${tasks[index].name}?`) // تأكيد من المستخدم
    if (isConfirmed) {
        tasks.splice(index, 1) // حذف المهمة من المصفوفة بناءً على الفهرس
        saveTasksToLocalStorage() // حفظ التغيير في Local Storage
        fillThePage() // إعادة ملء الصفحة بعد الحذف
    }
}

// تعديل اسم مهمة
function editTodo(index) {
    const task = prompt(`اكتب تعديل اسم المهمة : `, tasks[index].name) // مطالبة المستخدم بإدخال الاسم الجديد
    if (!task) return alert("اسم المهمة لا يمكن أن يكون فارغًا!") // التحقق من الإدخال
    tasks[index].name = task // تحديث اسم المهمة في المصفوفة
    saveTasksToLocalStorage() // حفظ التغيير في Local Storage
    fillThePage() // إعادة ملء الصفحة لعرض التعديل
}

// تبديل حالة المهمة (إكمال/إلغاء)
function toogleTodoCompletion(index) {
    tasks[index].isDone = !tasks[index].isDone // عكس الحالة: إذا كانت مكتملة تصبح غير مكتملة والعكس
    saveTasksToLocalStorage() // حفظ التغيير في Local Storage
    fillThePage() // إعادة ملء الصفحة لتحديث الحالة
}