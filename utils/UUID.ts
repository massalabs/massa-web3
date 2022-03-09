import { uuid } from 'uuidv4';
import "./string_proto";

export const generateUUID = (): string => {
	const guid = uuid();
	return guid.replaceAll("-", "");
};