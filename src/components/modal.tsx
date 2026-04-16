import React from "react";

export type ModalProps = {
	closeIconUrl?: string;
	closeIconAlt?: string;
};

export const Modal: React.FC<ModalProps> = ({ closeIconUrl, closeIconAlt }) => {
	return (
		<div
			role="dialog"
			className="absolute box-border caret-transparent hidden h-[1000px] w-full z-[10000] overflow-hidden left-0 top-0"
		>
			<div className="absolute box-border caret-transparent h-full w-full overflow-hidden left-0 top-0">
				<div className="absolute box-border caret-transparent inset-0">
					<div className="absolute box-border caret-transparent overflow-hidden inset-0" />
					<div className="absolute box-border caret-transparent overflow-hidden inset-0" />
					<div className="absolute box-border caret-transparent overflow-hidden inset-0" />
				</div>

				<div className="box-border caret-transparent">
					<div className="box-border caret-transparent">
						<div className="absolute text-[10.5px] bg-stone-950/10 box-border caret-transparent hidden leading-6 text-nowrap px-5 py-2.5 right-0 bottom-0" />

						<button
							title="Close (Esc)"
							className="absolute bg-white caret-transparent block h-11 leading-4 text-center w-11 z-[4] p-3 rounded-lg right-2 top-2"
						>
							<img
								src={
									closeIconUrl ??
									"https://c.animaapp.com/mlgn6ks3HRtrTP/assets/icon-34.svg"
								}
								alt={closeIconAlt ?? "Icon"}
								className="box-border caret-transparent h-full w-full"
							/>
						</button>

						<button
							title="Share"
							className="bg-transparent caret-transparent hidden leading-4 text-center p-0 rounded-lg before:accent-auto before:bg-stone-950 before:box-border before:caret-transparent before:text-stone-950 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-[18px] before:tracking-[normal] before:leading-4 before:list-outside before:list-disc before:[mask-position:50%_50%] before:[mask-repeat:no-repeat] before:[mask-size:18px] before:max-h-full before:max-w-full before:pointer-events-auto before:absolute before:text-center before:indent-[0px] before:normal-case before:visible before:w-[18px] before:m-auto before:border-separate before:inset-0 before:font-poppins"
						/>

						<button
							title="Toggle fullscreen"
							className="bg-transparent caret-transparent hidden leading-4 text-center p-0 rounded-lg before:accent-auto before:bg-stone-950 before:box-border before:caret-transparent before:text-stone-950 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-[18px] before:tracking-[normal] before:leading-4 before:list-outside before:list-disc before:[mask-position:50%_50%] before:[mask-repeat:no-repeat] before:[mask-size:18px] before:max-h-full before:max-w-full before:pointer-events-auto before:absolute before:text-center before:indent-[0px] before:normal-case before:visible before:w-[18px] before:m-auto before:border-separate before:inset-0 before:font-poppins"
						/>

						<button
							title="Zoom in/out"
							className="bg-transparent caret-transparent hidden leading-4 text-center p-0 rounded-lg before:accent-auto before:bg-stone-950 before:box-border before:caret-transparent before:text-stone-950 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-[18px] before:tracking-[normal] before:leading-4 before:list-outside before:list-disc before:[mask-position:50%_50%] before:[mask-repeat:no-repeat] before:[mask-size:18px] before:max-h-full before:max-w-full before:pointer-events-auto before:absolute before:text-center before:indent-[0px] before:normal-case before:visible before:w-[18px] before:m-auto before:border-separate before:inset-0 before:font-poppins"
						/>

						<div className="box-border caret-transparent">
							<div className="box-border caret-transparent">
								<div className="box-border caret-transparent">
									<div className="box-border caret-transparent" />
								</div>
							</div>
						</div>
					</div>

					<div className="box-border caret-transparent">
						<div className="box-border caret-transparent" />
					</div>

					<button
						type="button"
						title="Previous"
						className="bg-white shadow-[rgba(0,0,0,0.08)_0px_1px_1px_0px,rgba(0,0,0,0.06)_0px_1px_5px_0px] caret-transparent hidden h-10 leading-4 text-center origin-[50%_0%] w-10 overflow-hidden p-0 rounded-[50%] left-2.5 md:-left-5 before:accent-auto before:bg-stone-950 before:box-border before:caret-transparent before:text-stone-950 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-[18px] before:tracking-[normal] before:leading-4 before:list-outside before:list-disc before:[mask-image:url('https://web.archive.org/web/20250404191240im_/https://astatementof.com/cdn/shop/t/35/assets/icon-arrow-right.svg?v=99859212757265680021739935092')] before:[mask-position:50%_50%] before:[mask-repeat:no-repeat] before:[mask-size:18px] before:max-h-full before:max-w-full before:pointer-events-auto before:absolute before:text-center before:indent-[0px] before:normal-case before:visible before:w-[18px] before:m-auto before:border-separate before:inset-0 before:font-poppins"
					/>

					<button
						type="button"
						title="Next"
						className="bg-white shadow-[rgba(0,0,0,0.08)_0px_1px_1px_0px,rgba(0,0,0,0.06)_0px_1px_5px_0px] caret-transparent hidden h-10 leading-4 text-center origin-[50%_0%] w-10 overflow-hidden p-0 rounded-[50%] right-2.5 md:-right-5 before:accent-auto before:bg-stone-950 before:box-border before:caret-transparent before:text-stone-950 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-[18px] before:tracking-[normal] before:leading-4 before:list-outside before:list-disc before:[mask-image:url('https://web.archive.org/web/20250404191240im_/https://astatementof.com/cdn/shop/t/35/assets/icon-arrow-right.svg?v=99859212757265680021739935092')] before:[mask-position:50%_50%] before:[mask-repeat:no-repeat] before:[mask-size:18px] before:max-h-full before:max-w-full before:pointer-events-auto before:absolute before:text-center before:indent-[0px] before:normal-case before:visible before:w-[18px] before:m-auto before:border-separate before:inset-0 before:font-poppins"
					/>

					<div className="box-border caret-transparent" />

					<div className="box-border caret-transparent">
						<div className="box-border caret-transparent" />
						<a href="#" className="box-border caret-transparent" />
					</div>
				</div>
			</div>
		</div>
	);
};