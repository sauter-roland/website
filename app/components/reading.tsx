export default function Reading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">Reading that left an impression on me</h1>
            <p className="mb-2">
                I enjoy reading about different topics, from technology to history, science to philosophy.
                A few books have left a lasting impression on me, and I'd like to share them here.
                </p>

            <div className="space-y-8 mb-4">
                <div className="border-l-4 border-green-500 pl-4">
                    <h2 className="text-2xl font-semibold">Thank you for arguing (Jay Heinrichs)</h2>
                    <p className="mb-2">
                        Beyond the obvious practice of rhetoric, this book taught me to see the world through the lens of persuasion more so than as having to be right.
                        It changed how I communicate with others and how I understand them, helping me in a critical phase of my life.
                    </p>
                </div>
            </div>

            <div className="space-y-8 mb-4">
                <div className="border-l-4 border-green-500 pl-4">
                    <h2 className="text-2xl font-semibold">Code (Charles Petzold)</h2>
                    <p className="mb-2">
                        My introduction to the world of computers and information technology.
                    </p>
                </div>
            </div>

            <div className="space-y-8 mb-4">
                <div className="border-l-4 border-green-500 pl-4">
                    <h2 className="text-2xl font-semibold">Politics and the English Language (George Orwell)</h2>
                    <p className="mb-2">
                        Probably the most useful text on writing and language I've ever read.<br />
                        <a href="https://www.orwellfoundation.com/the-orwell-foundation/orwell/essays-and-other-works/politics-and-the-english-language/">
                        Read the essay on the Orwell Foundation website.
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
