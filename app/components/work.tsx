export default function Work() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6">Work Experience</h1>
            
            <div className="space-y-8">
                <div className="border-l-4 border-blue-500 pl-4">
                    <h2 className="text-2xl font-semibold">Software Engineer, Senior Engineer, Staff Engineer</h2>
                    <p className="text-gray-600 mb-2">Kongsberg Digital | 09/2021 - Present</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Led development of key features</li>
                        <li>Mentored junior developers</li>
                        <li>Improved system performance by 40%</li>
                    </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                    <h2 className="text-2xl font-semibold">Software Engineer</h2>
                    <p className="text-gray-600 mb-2">Previous Company | 2018 - 2020</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Developed web applications</li>
                        <li>Collaborated with cross-functional teams</li>
                        <li>Implemented CI/CD pipelines</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}