import React from "react"

const NavLinks = () => {
	return (
		<ul ref={linksRef}>
			{navItems.map((item, index) => (
				<li
					key={item.href}
					onMouseEnter={() => handleMouseEnter(index)}
					onMouseLeave={handleMouseLeave}
					style={{
						filter:
							hoveredIndex !== null && hoveredIndex !== index
								? "blur(4px)"
								: "none",
						opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.7 : 1,
						transition: "all 0.6s ease-in-out",
					}}
				>
					<a href={item.href} onClick={(e) => handleLinkClick(e, item.href)}>
						<span className='split-text'>{item.label}</span>
					</a>
				</li>
			))}
		</ul>
	)
}

export default NavLinks
