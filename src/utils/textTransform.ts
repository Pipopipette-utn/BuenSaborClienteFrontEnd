// Función para convertir una cadena a formato kebab-case (reemplaza los espacios por guiones medios)
export const toKebabCase = (str: string) => {
	return str.replace(/\s+/g, "-").toLowerCase();
};

// Función para convertir una cadena en formato kebab-case a formato con espacios (reemplaza los guiones medios por espacios)
export const fromKebabCase = (str: string) => {
	return str.replace(/-/g, " ");
};
