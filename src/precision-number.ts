import Decimal from 'decimal.js';

export type PrecisionNumberValue = Decimal.Value | PrecisionNumber | { toString(): string };

export class PrecisionNumber {
	// Private properties
	#decimal: Decimal;
	#decimalPlaces: number;
	#rounding: Decimal.Rounding;

	constructor(value: PrecisionNumberValue = '0', decimalPlaces: number = 2, rounding: Decimal.Rounding = Decimal.ROUND_DOWN) {
		this.#decimalPlaces = decimalPlaces;
		this.#rounding = rounding;
		this.#decimal = this.#decimalToFixedDecimal(new Decimal(value.toString().trim()));
	}

	// Private methods
	#decimalToFixedDecimal(decimal: Decimal) {
		return decimal.toDecimalPlaces(this.#decimalPlaces, this.#rounding);
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
		return this.#decimal.toFixed(this.#decimalPlaces, this.#rounding);
	}

	// Static methods
	static toFixed(value: PrecisionNumberValue, decimalPlaces: number = 2, rounding: Decimal.Rounding = Decimal.ROUND_DOWN) {
		return new Decimal(value.toString().trim()).toFixed(decimalPlaces, rounding);
	}

	// Public methods
	dividedBy(value: PrecisionNumberValue) {
		this.#decimal = this.#decimalToFixedDecimal(this.#decimal.dividedBy(value.toString().trim()));
		return this;
	}

	equals(value: PrecisionNumberValue) {
		return this.#decimal.equals(value.toString().trim());
	}

	gt(value: PrecisionNumberValue) {
		return this.#decimal.gt(value.toString().trim());
	}

	gte(value: PrecisionNumberValue) {
		return this.#decimal.gte(value.toString().trim());
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
		return this.#decimal.lt(value.toString().trim());
	}

	lte(value: PrecisionNumberValue) {
		return this.#decimal.lte(value.toString().trim());
	}

	minus(value: PrecisionNumberValue) {
		this.#decimal = this.#decimalToFixedDecimal(this.#decimal.minus(value.toString().trim()));
		return this;
	}

	negate() {
		this.#decimal = this.#decimalToFixedDecimal(this.#decimal.negated());
		return this;
	}

	plus(value: PrecisionNumberValue) {
		this.#decimal = this.#decimalToFixedDecimal(this.#decimal.plus(value.toString().trim()));
		return this;
	}

	times(value: PrecisionNumberValue) {
		this.#decimal = this.#decimalToFixedDecimal(this.#decimal.times(value.toString().trim()));
		return this;
	}

	toDividedBy(value: PrecisionNumberValue) {
		return new PrecisionNumber(this.#decimal.dividedBy(value.toString().trim()), this.#decimalPlaces, this.#rounding);
	}

	toJSON() {
		return this.value;
	}

	toMinus(value: PrecisionNumberValue) {
		return new PrecisionNumber(this.#decimal.minus(value.toString().trim()), this.#decimalPlaces, this.#rounding);
	}

	toNegated() {
		return new PrecisionNumber(this.#decimal.negated(), this.#decimalPlaces, this.#rounding);
	}

	toPlus(value: PrecisionNumberValue) {
		return new PrecisionNumber(this.#decimal.plus(value.toString().trim()), this.#decimalPlaces, this.#rounding);
	}

	toString() {
		return this.value;
	}

	toFixed(decimalPlaces: number = this.#decimalPlaces, rounding: Decimal.Rounding = this.#rounding) {
		return this.#decimal.toFixed(decimalPlaces, rounding);
	}

	toTimes(value: PrecisionNumberValue) {
		return new PrecisionNumber(this.#decimal.times(value.toString().trim()), this.#decimalPlaces, this.#rounding);
	}
}

export default PrecisionNumber;
