export default class PreferenceMP {

  id: string = '';
  statusCode:number = 0;

}
//Borrar una de las 2, si usamos la de abajo sacar "?""
export interface PreferenceMp{
	id?:string,
	statusCode?: number
}