const MathUtil = {};

function clamp (v, min, max) {
	if (v < min) return min;
	if (v > max) return max;
	return v;
}

MathUtil.clamp = clamp;

export default MathUtil;