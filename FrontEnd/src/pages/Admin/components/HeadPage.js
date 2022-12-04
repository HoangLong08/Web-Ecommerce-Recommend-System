import { Button } from 'antd'
import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons';
import './style.css'
import { useNavigate } from 'react-router-dom';
function HeadPage({
	title,
	actionMenu,
	isBack
}) {
	const navigate = useNavigate();
	return (
		<div className='wrapper-head-page'>
			<div className='head-page-left'>
				{isBack === 1 && (
					<Button className='wrapper-page-admin-back' icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
						Trở về
					</Button>
				)}
				<p className='head-page-title'>
					{title}
				</p>
			</div>
			<>
				{actionMenu}
			</>
		</div>
	)
}

export default HeadPage