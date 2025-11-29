export default function Science() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6">Books that left an impression on me</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
                I enjoy reading about different topics, from technology to history, science to philosophy.
                A few books have left a lasting impression on me, and I'd like to share them here.
                </p>

            <div className="space-y-8">
                <div className="border-l-4 border-green-500 pl-4">
                    <h2 className="text-2xl font-semibold">Thank you for arguing (Jay Heinrichs)</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                        Beyond the obvious practice of rhetoric, this book taught me to see the world through the lens of persuasion more so than as having to be right.
                        It changed how I communicate with others and how I understand them, helping me in a critical phase of my life.
                    </p>
                </div>
            </div>

            <div className="space-y-8">
                <div className="border-l-4 border-green-500 pl-4">
                    <h2 className="text-2xl font-semibold">Code (Charles Petzold)</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                        My introduction to the world of computers and information technology.
                    </p>
                </div>
            </div>

        </div>
    );
}
