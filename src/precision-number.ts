import Decimal from 'decimal.js';

export type PrecisionNumberValue = Decimal.Value | PrecisionNumber | { toString(): string };

export class PrecisionNumber {
	// Private properties
	#decimal: Decimal;
	#fractionDigits: number;
	#rounding: Decimal.Rounding;

	constructor(value: PrecisionNumberValue = '0', fractionDigits: number = 2, rounding: Decimal.Rounding = Decimal.ROUND_DOWN) {
		this.#fractionDigits = fractionDigits;
		this.#rounding = rounding;
		this.#decimal = this.#decimalToFixedDecimal(new Decimal(value.toString()));
	}

	// Private methods
	#decimalToFixedDecimal(decimal: Decimal) {
		return decimal.toDecimalPlaces(this.#fractionDigits, this.#rounding);
	}

	// Symbols
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.value;
	}

	[Symbol.toPrimitive](hint: string) {
		if (hint === 'number') return this.#decimal.toNumber();
		return this.value;
	}

	// Public getters
	get value() {
		return this.#decimal.toFixed(this.#fractionDigits, this.#rounding);
	}

	// Static methods
	static toFixed(value: PrecisionNumberValue, fractionDigits: number = 2, rounding: Decimal.Rounding = Decimal.ROUND_DOWN) {
		return new Decimal(value.toString()).toFixed(fractionDigits, rounding);
	}

	// Public methods
	equals(value: PrecisionNumberValue) {
		return this.#decimal.equals(value.toString());
	}

	gt(value: PrecisionNumberValue) {
		return this.#decimal.gt(value.toString());
	}

	gte(value: PrecisionNumberValue) {
		return this.#decimal.gte(value.toString());
	}

	isFinite() {
		return this.#decimal.isFinite();
	}

	isInteger() {
		return this.#decimal.isInteger();
	}

	isNaN() {
		return this.#decimal.isNaN();
	}

	isNegative() {
		return this.#decimal.isNegative();
	}

	isPositive() {
		return this.#decimal.isPositive();
	}

	isZero() {
		return this.#decimal.isZero();
	}

	lt(value: PrecisionNumberValue) {
		return this.#decimal.lt(value.toString());
	}

	lte(value: PrecisionNumberValue) {
		return this.#decimal.lte(value.toString());
	}

	minus(value: PrecisionNumberValue) {
		this.#decimal = this.#decimalToFixedDecimal(this.#decimal.minus(value.toString()));
		return this;
	}

	negate() {
		this.#decimal = this.#decimalToFixedDecimal(this.#decimal.negated());
		return this;
	}

	plus(value: PrecisionNumberValue) {
		this.#decimal = this.#decimalToFixedDecimal(this.#decimal.plus(value.toString()));
		return this;
	}

	times(value: PrecisionNumberValue) {
		this.#decimal = this.#decimalToFixedDecimal(this.#decimal.times(value.toString()));
		return this;
	}

	toJSON() {
		return this.value;
	}

	toMinus(value: PrecisionNumberValue) {
		return new PrecisionNumber(this.#decimal.minus(value.toString()), this.#fractionDigits, this.#rounding);
	}

	toNegated() {
		return new PrecisionNumber(this.#decimal.negated(), this.#fractionDigits, this.#rounding);
	}

	toPlus(value: PrecisionNumberValue) {
		return new PrecisionNumber(this.#decimal.plus(value.toString()), this.#fractionDigits, this.#rounding);
	}

	toString() {
		return this.value;
	}

	toFixed(fractionDigits: number = this.#fractionDigits, rounding: Decimal.Rounding = this.#rounding) {
		return this.#decimal.toFixed(fractionDigits, rounding);
	}

	toTimes(value: PrecisionNumberValue) {
		return new PrecisionNumber(this.#decimal.times(value.toString()), this.#fractionDigits, this.#rounding);
	}
}

export default PrecisionNumber;
