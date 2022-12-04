import { Button } from 'antd'
import React from 'react'
import HeadPage from '../components/HeadPage'

function Analyst() {
	return (
		<div>
			<HeadPage
				title="Phân tích"
				headPageRight={(
					<Button>
						Mở chế độ toàn màn hình
					</Button>
				)}
				isBack={0}
			/>
		</div>
	)
}

export default Analyst