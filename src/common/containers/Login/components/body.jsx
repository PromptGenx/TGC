import React from 'react'
import {MainContainer, MainH1, MainH2, CarouselH2, CarouselH3, CarouselContainer, CarouselButton, CarouselDivider, InfoIcon, InfoIcon1, InfoH2, InfoH3, LoginDivider, LoginH1, LoginButton, Link} from './style'
import {Segment, Grid, Divider, Icon, Form, Input} from 'semantic-ui-react'

const InfoFooter = () => {
	return (
		<CarouselContainer>
			<Grid centered columns={4} stretched>
				<Grid.Column width={4}>
					<Segment>
						<Icon.Group size='big'>
							<InfoIcon name='truck' size='big' />
						</Icon.Group>
						<InfoH2>Trucks and Drivers</InfoH2>
						<InfoH3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</InfoH3>
					</Segment>
				</Grid.Column>
				<Grid.Column width={4}>
					<Segment>
						<Icon.Group size='big'>
							<InfoIcon name='user' size='big' fitted/>
							<InfoIcon1 name='user' size='large' color='grey'/>
						</Icon.Group>
						<InfoH2>User management</InfoH2>
						<InfoH3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</InfoH3>
					</Segment>
				</Grid.Column>
				<Grid.Column width={4}>
					<Segment>
						<Icon.Group size='big'>
							<InfoIcon name='book' size='big' />
						</Icon.Group>
						<InfoH2>Reports</InfoH2>
						<InfoH3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</InfoH3>
					</Segment>
				</Grid.Column>
				<Grid.Column width={4}>
					<Segment>
						<Icon.Group size='big'>
							<InfoIcon name='calendar' size='big' />
						</Icon.Group>
						<InfoH2>Appointment features</InfoH2>
						<InfoH3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</InfoH3>
					</Segment>
				</Grid.Column>
			</Grid>
		</CarouselContainer>
	)
}

const Carousel = () => {
	return (
		<CarouselContainer>
			<Grid centered columns={3} className='borderTopGrey'>
				<Grid.Column width={1}>
					<Segment>
						<CarouselButton icon='left chevron'/>
					</Segment>
				</Grid.Column>
				<Grid.Column width={14}>
					<Segment>
						<CarouselH2>Key Features of TERMPointaaaaa</CarouselH2>
						<CarouselH3>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
						Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</CarouselH3>
						<CarouselH3>
						Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
						eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
						voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
						Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
						tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
						corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
						</CarouselH3>
					</Segment>
				</Grid.Column>
				<Grid.Column width={1}>
					<Segment>
						<CarouselButton icon='right chevron'/>
					</Segment>
				</Grid.Column>
			</Grid>
		</CarouselContainer>
	)
}

const Login = () => {
	return (
		<CarouselContainer>
			<Grid columns={1} stretched className='borderTopOrange' style={{'padding-left': '1.5rem'}}>
				<Grid.Row>
					<Grid.Column width={3}>
						<Segment>
							<LoginH1>Log in</LoginH1>
						</Segment>
					</Grid.Column>
				  </Grid.Row>
				<Grid.Row>
					<Grid.Column tablet={10} mobile={16} computer={6}>
						{/* Consider using Redux-Form */}
						<Form>
							<Form.Field>
								{/* <label>Username</label> */}
								<Input placeholder="  Username" icon={<Icon name='user' inverted bordered />} iconPosition='left'/>
								<Link href="#">Forgot Username?</Link>
							</Form.Field>
							<Form.Field>
								{/* <label>Password</label> */}
								<Input placeholder="  Password" type="password" icon={<Icon name='lock' inverted bordered />} iconPosition='left'/>
								<Link href="#">Forgot Password?</Link>
							</Form.Field>
							<Form.Field>
								<LoginButton primary content="Login" icon="sign in" />
							</Form.Field>

							<br/>
							<label>No account yet?<a href='#'> Register</a></label>
						</Form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</CarouselContainer>
	)
}

const Body = () => {
	return (
		<MainContainer>
			<Segment>
				<MainH1>Welcome to TERMPoint!</MainH1>
				<MainH2>The appointment system for terminals, trucks and trucking agents!</MainH2>
			</Segment>
			<Segment>
				<Grid columns={2} divided>
					<Grid.Row verticalAlign="middle">
						<Grid.Column width={8} mobile={8} style={{padding: '0rem'}}>
							{/* Carousel goes here
							<CarouselDivider /> */}
							<Carousel/>
						</Grid.Column>
						<Grid.Column width={8} mobile={8} style={{padding: '0rem'}} textAlign="left" stretched={true}>
							{/* Login goes here
							<LoginDivider /> */}
							<Login />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
			<Divider/>
			<Segment>
				{/* Bottom Content Section goes here */}
				<InfoFooter />
			</Segment>
		</MainContainer>
	)
}

export default Body
