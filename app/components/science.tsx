export default function Science() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6">Scientific Background</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-2">PhD in Natural Science (Bioinformatics)</p> 
            <div className="space-y-8">
                <div className="border-l-4 border-red-500 pl-4">
                    <h2 className="text-2xl font-semibold">GEMCAT</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                        A modeling tool to predict metabolite concentrations.
                        <br/><a href="https://github.com/MolecularBioinformatics/GEMCAT">Github</a>
                    </p> 
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                    <h2 className="text-2xl font-semibold">Thesis</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                        I defended my PhD thesis titled <em>Metabolites at Genome-Scale: 
                        Towards Genome-Scale Modeling Strategies for Metabolite Concentrations"</em>
                        in 2025 at <em>UiT The Arctic University of Norway</em> in Tromsø.<br/>
                        <a href="https://hdl.handle.net/11250/3221977">Nasjonalt vitenarkiv</a><br/>
                        Code for the thesis or the contents can be shared upon request.
                        The Github repository containing it all is currently private due to privacy concerns around some content.
                    </p> 
                </div>
            </div>
        </div>
    );
}
