import React, { useEffect, useMemo, useState } from "react";

type TankCalibration = {
	// Real-world tank dimensions in mm
	realDiameter: number;
	realHeight: number;
	// Real-world level values in height from bottom (mm)
	realWaterLevel?: number;
	realLowLevel?: number;
	realLowLowLevel?: number;
};

type WaterTankProps = {
	// Option 1: Use percentage values (0-100)
	waterLevel?: number;
	lowLevel?: number; // Yellow warning line (default: 30%)
	lowLowLevel?: number; // Red danger line (default: 15%)

	// Option 2: Use real-world calibration
	calibration?: TankCalibration;

	// SVG dimensions
	width?: number;
	height?: number;
	className?: string;
	style?: React.CSSProperties;
};

// Safe number conversion utility
const safeNumber = (value: any, fallback: number = 0): number => {
	if (value === null || value === undefined || value === "") {
		return fallback;
	}
	const num = Number(value);
	return isNaN(num) ? fallback : num;
};

// Safe percentage calculation
const safePercentage = (
	numerator: number,
	denominator: number,
	fallback: number = 0
): number => {
	const num = safeNumber(numerator);
	const den = safeNumber(denominator);
	if (den === 0) {
		return fallback;
	}

	const result = (num / den) * 100;
	return isNaN(result) ? fallback : Math.max(0, Math.min(100, result));
};

const safeVolume = (diameter: number, height: number): number => {
	const radius = safeNumber(diameter) / 2;
	const h = safeNumber(height);

	if (radius < 0 || h < 0) {
		return 0;
	}

	const volume = Math.PI * Math.pow(radius, 2) * h;
	return isNaN(volume) ? 0 : volume;
};

// Hook to calculate calibrated dimensions and percentages
const useTankCalibration = (props: WaterTankProps) => {
	return useMemo(() => {
		// SVG coordinate system constants
		const SVG_TANK_TOP = 39.7309;
		const SVG_TANK_BOTTOM = 202.869;
		const SVG_TANK_HEIGHT = SVG_TANK_BOTTOM - SVG_TANK_TOP; // ~163.14
		const SVG_TANK_WIDTH = 131.342 - 3.612; // ~127.73

		if (props.calibration) {
			const {
				realDiameter,
				realHeight,
				realWaterLevel = 0,
				realLowLevel = safeNumber(realHeight) * 0.3, // Default 30% of tank height
				realLowLowLevel = safeNumber(realHeight) * 0.15, // Default 15% of tank height
			} = props.calibration;

			// Safe conversions
			const safeDiameter = safeNumber(realDiameter, 1000); // Default 1m
			const safeHeight = safeNumber(realHeight, 1000); // Default 1m
			const safeWaterLevel = safeNumber(realWaterLevel, 0);
			const safeLowLevel = safeNumber(realLowLevel, safeHeight * 0.3);
			const safeLowLowLevel = safeNumber(realLowLowLevel, safeHeight * 0.15);

			// Convert real measurements to percentages
			const waterLevelPercent = safePercentage(safeWaterLevel, safeHeight, 0);
			const lowLevelPercent = safePercentage(safeLowLevel, safeHeight, 30);
			const lowLowLevelPercent = safePercentage(
				safeLowLowLevel,
				safeHeight,
				15
			);

			// Calculate actual volumes (cylindrical tank)
			const tankRadius = safeDiameter / 2;
			const totalVolume = safeVolume(safeDiameter, safeHeight); // mm³
			const currentVolume = safeVolume(safeDiameter, safeWaterLevel); // mm³

			// Convert volumes to liters (1 liter = 1,000,000 mm³)
			const totalVolumeLiters = totalVolume / 1000000;
			const currentVolumeLiters = currentVolume / 1000000;
			const volumePercentage = safePercentage(
				currentVolumeLiters,
				totalVolumeLiters,
				0
			);

			return {
				// Percentage values for rendering
				waterLevelPercent,
				lowLevelPercent,
				lowLowLevelPercent,

				// Real-world measurements
				realMeasurements: {
					diameter: safeDiameter,
					height: safeHeight,
					waterLevel: safeWaterLevel,
					lowLevel: safeLowLevel,
					lowLowLevel: safeLowLowLevel,
				},

				// Volume calculations
				volumes: {
					total: totalVolumeLiters,
					current: currentVolumeLiters,
					percentage: volumePercentage,
				},

				// SVG scaling factors
				scaling: {
					heightScale: safeHeight > 0 ? SVG_TANK_HEIGHT / safeHeight : 1,
					widthScale: safeDiameter > 0 ? SVG_TANK_WIDTH / safeDiameter : 1,
					svgTankHeight: SVG_TANK_HEIGHT,
					svgTankWidth: SVG_TANK_WIDTH,
				},

				// Display values
				display: {
					waterHeightMM: safeWaterLevel,
					waterHeightM: (safeWaterLevel / 1000).toFixed(2),
					lowLevelHeightMM: safeLowLevel,
					lowLowLevelHeightMM: safeLowLowLevel,
					diameterM: (safeDiameter / 1000).toFixed(2),
					totalHeightM: (safeHeight / 1000).toFixed(2),
				},
			};
		} else {
			// Use percentage-based values (legacy mode)
			const waterLevelPercent = Math.max(
				0,
				Math.min(100, safeNumber(props.waterLevel, 50))
			);
			const lowLevelPercent = Math.max(
				0,
				Math.min(100, safeNumber(props.lowLevel, 30))
			);
			const lowLowLevelPercent = Math.max(
				0,
				Math.min(100, safeNumber(props.lowLowLevel, 15))
			);

			return {
				waterLevelPercent,
				lowLevelPercent,
				lowLowLevelPercent,
				realMeasurements: null,
				volumes: null,
				scaling: {
					heightScale: 1,
					widthScale: 1,
					svgTankHeight: SVG_TANK_HEIGHT,
					svgTankWidth: SVG_TANK_WIDTH,
				},
				display: null,
			};
		}
	}, [props.calibration, props.waterLevel, props.lowLevel, props.lowLowLevel]);
};

export const AnimatedTank: React.FC<WaterTankProps> = ({
	width = 155,
	height = 203,
	className,
	style,
	...props
}) => {
	// Calculate calibrated dimensions and percentages
	const calibration = useTankCalibration(props);

	const {
		waterLevelPercent: validatedWaterLevel,
		lowLevelPercent: validatedLowLevel,
		lowLowLevelPercent: validatedLowLowLevel,
	} = calibration;

	// Animation state
	const [waveOffset, setWaveOffset] = useState(0);
	const [waveHeight, setWaveHeight] = useState(1);

	// Tank dimensions with safe fallbacks
	const tankTop = 39.7309;
	const tankBottom = 202.869;
	const tankHeight = safeNumber(tankBottom - tankTop, 163.14);
	const tankCurveFactor = 8; // Matches the tank's bottom curve

	// Calculate positions with NaN protection
	const waterHeight = safeNumber((validatedWaterLevel / 100) * tankHeight, 0);
	const waterTop = safeNumber(tankBottom - waterHeight, tankBottom);
	const lowLineY = safeNumber(
		tankBottom - (validatedLowLevel / 100) * tankHeight,
		tankBottom
	);
	const lowLowLineY = safeNumber(
		tankBottom - (validatedLowLowLevel / 100) * tankHeight,
		tankBottom
	);

	// Enhanced wave parameters with safe values
	const baseWaveHeight = 8;
	const waveLength = safeNumber(20, 20);

	// CSS Animation using requestAnimationFrame
	useEffect(() => {
		let animationId: number;
		let startTime: number | null = null;
		let heightStartTime: number | null = null;

		const animate = (currentTime: number) => {
			if (!startTime) startTime = currentTime;
			if (!heightStartTime) heightStartTime = currentTime;

			// Wave horizontal movement (1.5s cycle)
			const waveProgress = ((currentTime - startTime) / 1500) % 1;
			setWaveOffset(safeNumber(waveProgress * 2 * Math.PI, 0));

			// Wave height pulsing (2s cycle total - 1s up, 1s down)
			const heightProgress = ((currentTime - heightStartTime) / 2000) % 1;
			const heightValue =
				heightProgress < 0.5
					? 1 + 0.3 * Math.sin(safeNumber(heightProgress * 2 * Math.PI, 0)) // 1 to 1.3 and back
					: 1 +
						0.3 * Math.sin(safeNumber((heightProgress - 0.5) * 2 * Math.PI, 0)); // Continue the cycle
			setWaveHeight(
				safeNumber(
					1 + 0.3 * Math.sin(safeNumber(heightProgress * 2 * Math.PI, 0)),
					1
				)
			);

			animationId = requestAnimationFrame(animate);
		};

		animationId = requestAnimationFrame(animate);

		return () => {
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
		};
	}, []);

	// Generate curve matching tank bottom angle with safe values
	const generateTankCurvedLine = (yPosition: number) => {
		const startX = 3.612;
		const endX = 131.342;
		const midX = (startX + endX) / 2;
		const safeY = safeNumber(yPosition, tankBottom);
		const safeCurveFactor = safeNumber(tankCurveFactor, 8);

		// Curve matches tank bottom angle using tankCurveFactor
		return `M${startX} ${safeY} Q${midX} ${
			safeY + safeCurveFactor
		} ${endX} ${safeY}`;
	};

	// Generate label position matching curve with safe values
	const getLabelPosition = (yPosition: number) => {
		const labelX = 141.342; // 20px left of startX (3.612)
		const midX = (3.612 + 131.342) / 2;
		const safeY = safeNumber(yPosition, tankBottom);
		const safeCurveFactor = safeNumber(tankCurveFactor, 8);

		// Calculate Y position accounting for curve
		const curveOffset =
			safeCurveFactor * (1 - Math.pow((midX - 3.612) / (midX - 3.612), 2));
		return { x: labelX, y: safeY + curveOffset };
	};

	// Generate wave path with safe values
	const generateWavePath = (offset: number, heightMultiplier: number) => {
		const startX = 3.612;
		const endX = 131.342;
		const width = safeNumber(endX - startX, 127.73);
		const safeOffset = safeNumber(offset, 0);
		const safeHeightMultiplier = safeNumber(heightMultiplier, 1);
		const safeWaveLength = safeNumber(waveLength, 20);

		const segments = Math.ceil(width / safeWaveLength);

		let path = `M${startX} ${waterTop + waterHeight}`;
		path += ` L${startX} ${
			waterTop +
			baseWaveHeight * safeHeightMultiplier * (0.3 + 0.7 * Math.sin(safeOffset))
		}`;

		for (let i = 1; i <= segments; i++) {
			const x = startX + (i * width) / segments;
			const waveFactor = Math.sin(safeOffset + i * 0.8);
			const y =
				waterTop +
				baseWaveHeight * safeHeightMultiplier * (0.3 + 0.7 * waveFactor);
			path += ` L${x} ${safeNumber(y, waterTop)}`;
		}

		path += ` L${endX} ${waterTop + waterHeight} Z`;
		return path;
	};

	// Get positions for all labels with safe values
	const highLabelPos = getLabelPosition(tankTop);
	const lowLabelPos = getLabelPosition(lowLineY);
	const lowLowLabelPos = getLabelPosition(lowLowLineY);

	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 155 203'
			fill='none'
			className={className}
			style={style}
			{...props}>
			{/* Tank structure */}
			<path
				d='M67.2718 19.4258C59.3282 19.4258 44.3058 18.434 44.3058 14.6764V9.1696C44.3058 5.41426 59.3282 4.42249 67.2718 4.42249C75.2137 4.42249 90.2344 5.41426 90.2344 9.1696V14.6764C90.2344 18.4317 75.2137 19.4258 67.2718 19.4258ZM67.2718 5.54727C52.7687 5.54727 45.183 7.90506 45.183 9.16736V14.6741C45.183 15.9387 52.7687 18.2965 67.2718 18.2965C81.7732 18.2965 89.3572 15.9387 89.3572 14.6741V9.16736C89.3572 7.90506 81.7714 5.54727 67.2718 5.54727Z'
				fill='black'
			/>
			<path
				d='M67.2719 48.1454C36.5236 48.1454 3.84375 44.8815 3.84375 38.8315C3.84375 38.5204 4.04024 38.2679 4.28233 38.2679C4.52443 38.2679 4.72092 38.5204 4.72092 38.8315C4.72092 42.1766 26.9958 47.0183 67.2719 47.0183C107.546 47.0183 129.821 42.1788 129.821 38.8315C129.821 38.5204 130.018 38.2679 130.26 38.2679C130.502 38.2679 130.698 38.5204 130.698 38.8315C130.698 44.8815 98.0184 48.1454 67.2719 48.1454Z'
				fill='black'
			/>

			{/* Clip path for water */}
			<defs>
				<clipPath id='water-clip'>
					<path d='M3.61218 39.7309V184.954C3.61218 196.589 36.5183 202.869 67.4789 202.869C98.4394 202.869 131.344 196.589 131.342 184.951V39.7309C131.342 39.6385 131.333 39.5483 131.314 39.4626C131.33 39.2553 131.342 39.0434 131.342 38.8315C131.342 27.6579 115.407 17.9517 90.6712 9.16748V14.007C90.6712 4.11379 71.1788 3.85681 67.2701 3.85681C63.3614 3.85681 43.8655 4.11153 43.8655 9.16748V14.0769C19.3854 18.0599 3.61218 27.739 3.61218 38.8315C3.61218 39.0253 3.6227 39.2169 3.64025 39.4513C3.62095 39.5415 3.61218 39.6362 3.61218 39.7309Z' />
				</clipPath>
			</defs>

			{/* Water fill with enhanced animation */}
			<g clipPath='url(#water-clip)'>
				<rect
					x='3.612'
					y={isNaN(waterTop) ? tankBottom : waterTop}
					width='127.73'
					height={isNaN(waterHeight) ? 0 : waterHeight}
					fill='#007AFF'
					fillOpacity={0.4}
				/>

				<path
					fill='#4DA6FF'
					fillOpacity={0.9}
					d={generateWavePath(waveOffset, waveHeight)}
				/>
			</g>

			{/* Tank-curved indicator lines */}
			{/* Green line (H) */}
			<path
				d={generateTankCurvedLine(tankTop)}
				stroke='#1EFC21'
				strokeWidth={4}
				strokeLinecap='round'
			/>
			<text
				x={highLabelPos.x}
				y={highLabelPos.y}
				fill='#000000'
				fontSize='12'
				fontWeight='bold'
				textAnchor='start'>
				H
			</text>

			{/* Yellow warning line (L) */}
			<path
				d={generateTankCurvedLine(lowLineY)}
				stroke='#FFF706'
				strokeWidth={4}
				strokeLinecap='round'
			/>
			<text
				x={lowLabelPos.x}
				y={lowLabelPos.y}
				fill='#000000'
				fontSize='12'
				fontWeight='bold'
				textAnchor='start'>
				L
			</text>

			{/* Red danger line (LL) */}
			<path
				d={generateTankCurvedLine(lowLowLineY)}
				stroke='#FF171A'
				strokeWidth={4}
				strokeLinecap='round'
			/>
			<text
				x={lowLowLabelPos.x}
				y={lowLowLabelPos.y}
				fill='#000000'
				fontSize='12'
				fontWeight='bold'
				textAnchor='start'>
				LL
			</text>

			{/* Rest of the tank SVG */}
			<path
				d='M67.2718 13.9191C59.3282 13.9191 44.3058 12.9273 44.3058 9.16743C44.3058 5.4121 59.3282 4.42029 67.2718 4.42029C75.2137 4.42029 90.2344 5.4121 90.2344 9.16743C90.2344 12.9273 75.2137 13.9191 67.2718 13.9191ZM67.2718 5.54734C52.7687 5.54734 45.183 7.90514 45.183 9.16743C45.183 10.432 52.7687 12.792 67.2718 12.792C81.7732 12.792 89.3572 10.432 89.3572 9.16743C89.3572 7.90514 81.7714 5.54734 67.2718 5.54734Z'
				fill='black'
			/>
			<path
				d='M67.4789 202.869C36.5183 202.869 3.61218 196.589 3.61218 184.954V167.505C1.3754 165.14 0.242093 162.543 0.242093 159.78C0.242093 156.962 1.3754 154.332 3.61218 151.958V142.435C1.57188 140.345 0.540334 138.048 0.540334 135.598C0.540334 133.046 1.57364 130.709 3.61218 128.639V120.516C1.42627 118.78 0.361389 116.783 0.361389 114.418C0.361389 112.038 1.42452 110.032 3.61218 108.301V96.0226C0.161396 93.7279 0.161397 91.3881 0.161397 90.2385C0.161397 87.9258 1.29294 86.0256 3.61218 84.45V72.111C0.289462 70.283 0 68.3737 0 66.7125C0 63.8249 1.92451 62.2584 3.61218 61.3139V39.7309C3.61218 39.6362 3.62095 39.5415 3.64025 39.4513C3.6227 39.2169 3.61218 39.0253 3.61218 38.8315C3.61218 27.739 19.3854 18.0599 43.8655 14.0769V9.16748C43.8655 4.11153 63.3614 3.85681 67.2701 3.85681C71.1788 3.85681 90.6712 4.11379 90.6712 9.16748V14.007C115.407 17.9517 131.342 27.6579 131.342 38.8315C131.342 39.0434 131.33 39.2553 131.314 39.4626C131.333 39.5483 131.342 39.6385 131.342 39.7309V61.5641C133.491 62.9008 134.538 64.5913 134.538 66.7125C134.538 68.2926 134.281 70.1094 131.342 71.8676V84.7318C133.382 86.2488 134.375 88.0543 134.375 90.2385C134.375 91.9742 133.995 93.8338 131.342 95.7408V108.675C133.223 110.318 134.175 112.25 134.175 114.418C134.175 116.636 133.247 118.523 131.342 120.171V129.106C133.102 131.072 133.995 133.251 133.995 135.598C133.995 137.922 133.103 140.097 131.342 142.067V152.413C133.302 154.665 134.295 157.14 134.295 159.778C134.295 162.341 133.302 164.775 131.342 167.02V184.951C131.344 196.589 98.4394 202.869 67.4789 202.869ZM5.36652 39.9833V62.069C5.36652 62.5334 5.14722 62.9481 4.81039 63.1172C2.10169 64.4877 1.75434 65.759 1.75434 66.7125C1.75434 67.587 1.75433 68.7817 4.80688 70.301C5.14372 70.4701 5.36652 70.8871 5.36652 71.3514V85.142C5.36652 85.5748 5.17354 85.9715 4.86829 86.1586C2.22099 87.7929 1.91398 89.2693 1.91398 90.2385C1.91398 91.0906 1.91398 92.5197 4.86303 94.305C5.17003 94.492 5.36652 94.8888 5.36652 95.3238V108.945C5.36652 109.351 5.19634 109.728 4.92091 109.926C3.03325 111.296 2.11573 112.766 2.11573 114.418C2.11573 115.462 2.40695 117.06 4.92091 118.893C5.19634 119.093 5.36477 119.467 5.36477 119.873V129.198C5.36477 129.557 5.23144 129.895 5.00688 130.107C3.17886 131.836 2.29117 133.632 2.29117 135.6C2.29117 137.437 3.20693 139.247 5.01214 140.981C5.23319 141.193 5.36477 141.528 5.36477 141.882V152.499C5.36477 152.846 5.2402 153.175 5.02793 153.389C3.0157 155.405 1.99468 157.555 1.99468 159.78C1.99468 161.948 3.01395 164.065 5.02618 166.073C5.24021 166.287 5.36477 166.617 5.36477 166.964V184.954C5.36477 192.361 30.8728 200.615 67.4771 200.615C104.08 200.615 129.588 192.361 129.588 184.954V166.506C129.588 166.175 129.702 165.857 129.9 165.643C131.651 163.752 132.539 161.777 132.539 159.778C132.539 157.699 131.651 155.684 129.898 153.788C129.7 153.574 129.586 153.259 129.586 152.927V141.542C129.586 141.204 129.705 140.881 129.911 140.667C131.477 139.031 132.239 137.374 132.239 135.596C132.239 133.799 131.477 132.133 129.912 130.506C129.707 130.292 129.586 129.969 129.586 129.629V119.553C129.586 119.161 129.744 118.798 130.004 118.593C132.146 116.9 132.419 115.469 132.419 114.414C132.419 112.904 131.628 111.538 130 110.239C129.742 110.034 129.586 109.671 129.586 109.281V95.0578C129.586 94.634 129.77 94.2463 130.065 94.0547C132.621 92.3822 132.621 91.0883 132.621 90.2318C132.621 89.3211 132.356 87.9326 130.058 86.3908C129.768 86.1969 129.586 85.8115 129.586 85.3922V71.126C129.586 70.6707 129.798 70.2604 130.125 70.0869C132.782 68.66 132.782 67.578 132.782 66.7057C132.782 65.883 132.505 64.6342 130.118 63.3178C129.795 63.1397 129.586 62.7317 129.586 62.2831V40.0712C129.54 39.9202 129.521 39.7579 129.535 39.5979C129.563 39.2868 129.586 39.0569 129.586 38.827C129.586 28.9067 113.551 19.7821 89.6888 16.1191C89.2485 16.0515 88.9151 15.5714 88.9151 14.9989V9.31624C87.9327 7.97956 79.8312 6.10414 67.2684 6.10414C54.702 6.10414 46.6005 7.97956 45.6181 9.31624V15.0665C45.6181 15.6368 45.2882 16.1169 44.8479 16.1845C21.2328 19.8857 5.36477 28.9833 5.36477 38.8247C5.36477 39.0388 5.38406 39.2485 5.40161 39.4604C5.4174 39.6317 5.40511 39.8143 5.36652 39.9833Z'
				fill='black'
			/>
			<path
				d='M74.4822 9.50103C73.998 9.50103 73.605 8.99612 73.605 8.37398V2.58319C73.605 2.40061 73.491 2.2541 73.3489 2.2541H60.03C59.8896 2.2541 59.7756 2.40061 59.7756 2.58319V8.37398C59.7756 8.99612 59.3826 9.50103 58.8984 9.50103C58.4142 9.50103 58.0212 8.99612 58.0212 8.37398V2.58319C58.0212 1.1586 58.923 0 60.03 0H73.3489C74.4576 0 75.3594 1.1586 75.3594 2.58319V8.37398C75.3594 8.99612 74.9664 9.50103 74.4822 9.50103Z'
				fill='black'
			/>
		</svg>
	);
};

// Demo component to show the tank in action
// const WaterTankDemo: React.FC = () => {
// 	const [waterLevel, setWaterLevel] = useState(50);
// 	const [useCalibration, setUseCalibration] = useState(false);
// 	const [realWaterLevel, setRealWaterLevel] = useState(980); // 980mm = 50% of 1960mm

// 	// Real tank dimensions (your example)
// 	const tankDimensions = {
// 		realDiameter: 2350, // mm
// 		realHeight: 1960, // mm
// 		realLowLevel: 480, // mm (your example)
// 		realLowLowLevel: 294, // mm (15% of 1960)
// 	};

// 	const calibrationConfig: TankCalibration = {
// 		...tankDimensions,
// 		realWaterLevel: realWaterLevel,
// 	};

// 	return (
// 		<div className='p-8 bg-gray-100 min-h-screen flex flex-col items-center'>
// 			<h1 className='text-3xl font-bold mb-6'>
// 				Calibrated Water Tank Component
// 			</h1>

// 			<div className='mb-6 bg-white p-4 rounded-lg shadow'>
// 				<label className='flex items-center mb-4'>
// 					<input
// 						type='checkbox'
// 						checked={useCalibration}
// 						onChange={e => setUseCalibration(e.target.checked)}
// 						className='mr-2'
// 					/>
// 					Use Real-World Calibration
// 				</label>

// 				{useCalibration ? (
// 					<div className='space-y-4'>
// 						<div>
// 							<label className='block text-sm font-medium mb-2'>
// 								Water Level: {realWaterLevel}mm (
// 								{((realWaterLevel / tankDimensions.realHeight) * 100).toFixed(
// 									1
// 								)}
// 								%)
// 							</label>
// 							<input
// 								type='range'
// 								min='0'
// 								max={tankDimensions.realHeight}
// 								value={realWaterLevel}
// 								onChange={e => setRealWaterLevel(Number(e.target.value))}
// 								className='w-full'
// 							/>
// 						</div>

// 						<div className='grid grid-cols-2 gap-4 text-sm'>
// 							<div>
// 								<p>
// 									<strong>Tank Dimensions:</strong>
// 								</p>
// 								<p>
// 									Diameter: {(tankDimensions.realDiameter / 1000).toFixed(2)}m
// 								</p>
// 								<p>Height: {(tankDimensions.realHeight / 1000).toFixed(2)}m</p>
// 							</div>
// 							<div>
// 								<p>
// 									<strong>Levels:</strong>
// 								</p>
// 								<p>
// 									Low Level: {tankDimensions.realLowLevel}mm (
// 									{(
// 										(tankDimensions.realLowLevel / tankDimensions.realHeight) *
// 										100
// 									).toFixed(1)}
// 									%)
// 								</p>
// 								<p>
// 									Low-Low: {tankDimensions.realLowLowLevel}mm (
// 									{(
// 										(tankDimensions.realLowLowLevel /
// 											tankDimensions.realHeight) *
// 										100
// 									).toFixed(1)}
// 									%)
// 								</p>
// 							</div>
// 						</div>
// 					</div>
// 				) : (
// 					<div>
// 						<label className='block text-sm font-medium mb-2'>
// 							Water Level: {waterLevel}%
// 						</label>
// 						<input
// 							type='range'
// 							min='0'
// 							max='100'
// 							value={waterLevel}
// 							onChange={e => setWaterLevel(Number(e.target.value))}
// 							className='w-full'
// 						/>
// 					</div>
// 				)}
// 			</div>

// 			<div className='bg-white p-8 rounded-lg shadow-lg mb-6'>
// 				<AnimatedTank
// 					{...(useCalibration
// 						? { calibration: calibrationConfig }
// 						: { waterLevel, lowLevel: 30, lowLowLevel: 15 })}
// 					width={200}
// 					height={260}
// 				/>
// 			</div>

// 			{useCalibration && <TankInfoDisplay calibration={calibrationConfig} />}

// 			<div className='mt-6 max-w-md text-sm text-gray-600'>
// 				<p>
// 					<span className='inline-block w-4 h-1 bg-green-500 mr-2'></span>
// 					<strong>H:</strong> High level indicator
// 				</p>
// 				<p>
// 					<span className='inline-block w-4 h-1 bg-yellow-500 mr-2'></span>
// 					<strong>L:</strong> Low level warning
// 				</p>
// 				<p>
// 					<span className='inline-block w-4 h-1 bg-red-500 mr-2'></span>
// 					<strong>LL:</strong> Low-low danger level
// 				</p>
// 			</div>
// 		</div>
// 	);
// };

// // Component to display calculated tank information
// const TankInfoDisplay: React.FC<{ calibration: TankCalibration }> = ({
// 	calibration,
// }) => {
// 	const tankCalibration = useTankCalibration({ calibration });
// 	const { realMeasurements, volumes, display } = tankCalibration;

// 	if (!realMeasurements || !volumes || !display) return null;

// 	return (
// 		<div className='bg-white p-6 rounded-lg shadow-lg max-w-2xl'>
// 			<h3 className='text-xl font-semibold mb-4'>Tank Information</h3>

// 			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
// 				<div>
// 					<h4 className='font-medium text-gray-700 mb-2'>
// 						Physical Dimensions
// 					</h4>
// 					<div className='space-y-1 text-sm'>
// 						<p>Diameter: {display.diameterM}m</p>
// 						<p>Height: {display.totalHeightM}m</p>
// 						<p>Current Level: {display.waterHeightM}m</p>
// 					</div>
// 				</div>

// 				<div>
// 					<h4 className='font-medium text-gray-700 mb-2'>
// 						Volume Calculations
// 					</h4>
// 					<div className='space-y-1 text-sm'>
// 						<p>Total Capacity: {volumes.total.toLocaleString()} L</p>
// 						<p>Current Volume: {volumes.current.toLocaleString()} L</p>
// 						<p>Fill Percentage: {volumes.percentage.toFixed(1)}%</p>
// 					</div>
// 				</div>

// 				<div>
// 					<h4 className='font-medium text-gray-700 mb-2'>Warning Levels</h4>
// 					<div className='space-y-1 text-sm'>
// 						<p>Low Level: {display.lowLevelHeightMM}mm</p>
// 						<p>Low-Low Level: {display.lowLowLevelHeightMM}mm</p>
// 						<p>
// 							Current Status:{" "}
// 							{realMeasurements.waterLevel <= realMeasurements.lowLowLevel
// 								? "🔴 Critical"
// 								: realMeasurements.waterLevel <= realMeasurements.lowLevel
// 									? "🟡 Warning"
// 									: "🟢 Normal"}
// 						</p>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
