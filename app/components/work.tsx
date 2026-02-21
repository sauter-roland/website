export default function Work() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6">Work Experience</h1>
            
            <div className="space-y-8">
                <div className="border-l-4 border-blue-500 pl-4">
                    <h2 className="text-2xl font-semibold">Core skills</h2>
                    <p className="text-gray-400 mb-2">Data scientist and software engineer with broad competences and a fast learner</p>
                    <ul className="text-gray-400 list-disc list-inside space-y-1">
                        <li>Optimization approaches</li>
                        <li>End-to-end data science and data engineering</li>
                        <li>Collaboration across disciplines, backgrounds, and cultures</li>
                    </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                    <h2 className="text-2xl font-semibold">Software Engineer, Senior Engineer, Staff Engineer</h2>
                    <p className="text-gray-400 mb-2">Kongsberg Digital | 09/2021 - Present</p>
                    <ul className="text-gray-400 list-disc list-inside space-y-1">
                        <li>Led efforts in diverse software engineering and data science projects</li>
                        <li><a href="https://kongsbergdigital.com/customer-stories/shell-ormen-lange">
                        Led production optimization saving millions of kroners and powering thousands of additional UK households
                        </a></li>
                        <li>Hired and mentored many junior developers, helping to build the team</li>
                        <li>Architected AI-enabled work process management system</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}