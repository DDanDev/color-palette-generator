const root = document.getElementById('root');

const inputs = {
	nOfColorsInput: document.getElementById('nOfColorsInput'),
	baseHueInput: document.getElementById('baseHueInput'),
	baseSatInput: document.getElementById('baseSatInput'),
	offsetSatInput: document.getElementById('offsetSatInput'),
	baseLightInput: document.getElementById('baseLightInput'),
	offsetLightInput: document.getElementById('offsetLightInput'),
};

const fit = (nbr) => {
	if (nbr > 100) return 100;
	if (nbr < 0) return 0;
	return nbr;
};

const generateColors = () => {
	const nOfColors = parseInt(inputs.nOfColorsInput.value);
	const hueDistance = parseInt(360 / nOfColors);
	let baseHue = parseInt(inputs.baseHueInput.value) % 360;
	baseHue = baseHue < 0 ? 360 + baseHue : baseHue;
	const baseSat = parseInt(inputs.baseSatInput.value);
	const offsetSat = parseInt(inputs.offsetSatInput.value);
	const baseLight = parseInt(inputs.baseLightInput.value);
	const offsetLight = parseInt(inputs.offsetLightInput.value);

	root.innerHTML = '';
	for (let i = 0; i < nOfColors; i++) {
		const baseColor = `hsl(${(hueDistance * i + baseHue) % 360}, ${fit(baseSat)}%, ${fit(baseLight)}%)`;
		const offsetColor = `hsl(${(hueDistance * i + baseHue) % 360}, ${fit(baseSat + offsetSat)}%, ${fit(baseLight + offsetLight)}%)`;
		root.insertAdjacentHTML(
			'beforeend',
			`
                <div class="category">
                    <div class="color" style="background: ${baseColor}"></div>
                    <p class="colText">${baseColor}</p>

                    <div class="color" style="background: ${offsetColor}"></div>
                    <p class="colText">${offsetColor}</p>

                    <div class="color example" style="background: ${baseColor}">
                        <div class="color inner" style="background: ${offsetColor}"></div>
                    </div>
                </div>
            `
		);
	}
};

for (const id in inputs) {
	const inputNumber = inputs[id].cloneNode();
	inputNumber.type = 'number';
	inputNumber.id += 'Nbr';
	inputs[id].insertAdjacentElement('afterend', inputNumber);

	inputNumber.addEventListener('input', () => {
		if (inputNumber.value > inputNumber.max) inputNumber.value = inputNumber.max;
		if (inputNumber.value < inputNumber.min) inputNumber.value = inputNumber.min;
		inputNumber.value = parseInt(inputNumber.value);

		inputs[id].value = inputNumber.value;
		generateColors();
	});

	inputs[id].addEventListener('input', () => {
		inputNumber.value = inputs[id].value;
		generateColors();
	});
}

generateColors();
