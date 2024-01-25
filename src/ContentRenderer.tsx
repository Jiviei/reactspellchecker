import React, { useEffect, useState } from 'react';
import {PartOfContent} from './partsOfContent';
import Tooltip from './Tooltip';
import './ContentRenderer.css'



const ContentRenderer = ({ data }: { data: PartOfContent[] }) => {
	const [partsOfContent, setpartsOfContent] = useState<PartOfContent[]>([]);
	console.log(data)
	useEffect(() => {
		setpartsOfContent(data);
	  }, [data]);
    return (
		<pre>
			{partsOfContent.map((content) => (
				<span>
					{content.advices ? (
						<Tooltip
							children={<span className='misspelled_word'>{content.content}</span>}
							content={
							<div  className='advices'>
								{content.advices.map((advice) => (
									<div className='advice'
									onClick={() => {
										content.content = advice;
										delete content.advices;
										setpartsOfContent([...partsOfContent]);
										}}
									>
										{advice}
									</div>))
								}									
							</div> 
							}
							hideInMobile={false}
							interactive={true}
						/>
					) : (
						content.content
					)}
				</span>
			))}
		</pre>
	);
 };
 
 export default ContentRenderer;