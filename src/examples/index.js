function getSearchParameters() {
    const paramString = window.location.search.substring(1);
    return paramString !== null && paramString.length > 0 ? decodeParamString(paramString) : {};

    function decodeParamString(paramString) {
        const params = {};
        paramString.split('&').forEach((param) => {
            const [key, value] = param.split('=');
            params[key] = value;
        });
        return params;
    }
}

function defineExample(name) {
    return {
        name: name,
    };
}

const examples = {
    image: defineExample('Image loading'),
    ui: defineExample('UI graphics layer'),
    time: defineExample('Time scale'),
    filterShaders: defineExample('Filter shders'),
    mandelbrotShader: defineExample('The Mandelbrot set inside a shader'),
    input: defineExample('Static Input class'),
};

const savedExampleName = getSearchParameters()['example'] ?? null;
if (!examples.hasOwnProperty(savedExampleName)) {
    const main = document.getElementsByTagName('main')[0];

    const container = document.createElement('div');
    container.innerHTML = '<h2>Examples:</h2>';

    main.appendChild(container);

    const exampleKeys = Object.keys(examples);
    for (const exampleKey of exampleKeys) {
        const example = examples[exampleKey];

        const exampleLink = document.createElement('a');
        exampleLink.innerText = example.name;
        exampleLink.href = '?example=' + exampleKey;

        const exampleLinkUnderline = document.createElement('div');
        exampleLink.appendChild(exampleLinkUnderline);

        const exampleLinkContainer = document.createElement('div');
        exampleLinkContainer.classList.add('example-link');
        exampleLinkContainer.appendChild(exampleLink);

        container.appendChild(exampleLinkContainer);
    }
} else {
    import('./' + savedExampleName);
}
