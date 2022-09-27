/// <reference types="@sveltejs/kit" />

declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

declare namespace Validation {
	type FormErrors = string[];
	type FieldErrors = { [field: string]: string[] };
	type Errors = { formErrors: FormErrors; fieldErrors: FieldErrors };
}

declare module '*.svx';
