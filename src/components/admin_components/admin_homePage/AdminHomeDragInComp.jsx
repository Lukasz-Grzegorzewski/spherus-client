import axios from "axios";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import HoverVideoPlayer from "react-hover-video-player";

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result = {};
	result[droppableSource.droppableId] = sourceClone;
	result[droppableDestination.droppableId] = destClone;

	return result;
};

class AdminHomeDragInComp extends Component {
	id2List = {
		droppable: "items",
		droppable2: "selected",
	};

	// eslint-disable-next-line react/state-in-constructor
	state = {
		items: [],
		selected: [],
		show: false,
		catName: {},
		bigShow: false,
	};

	constructor(props) {
		super(props);
		const { idCat } = this.props;

		axios
			.get(
				`${import.meta.env.VITE_URL_SPHERUS_API}/videos/categories/${idCat}`,
			)
			.then((res) => {
				this.setState({ items: res.data });
			})
			.catch((err) => console.error(err));
		axios
			.get(`${import.meta.env.VITE_URL_SPHERUS_API}/categories/${idCat}`)
			.then((res) => {
				this.setState({ catName: res.data });
				this.setState({ bigShow: true });
			})
			.catch((err) => console.error(err));
	}

	// eslint-disable-next-line react/destructuring-assignment
	getList = (id) => this.state[this.id2List[id]];

	onDragEnd = (result) => {
		const { source, destination } = result;

		if (!destination) {
			return;
		}

		if (source.droppableId === destination.droppableId) {
			const items = reorder(
				this.getList(source.droppableId),
				source.index,
				destination.index,
			);

			let state = { items };

			if (source.droppableId === "droppable2") {
				state = { selected: items };
			}

			this.setState(state);
		} else {
			const resultT = move(
				this.getList(source.droppableId),
				this.getList(destination.droppableId),
				source,
				destination,
			);

			this.setState({
				items: resultT.droppable,
				selected: resultT.droppable2,
			});
		}
	};

	postDisplayCarousel = () => {
		// eslint-disable-next-line react/destructuring-assignment
		this.state.selected.forEach((element) => {
			axios
				.post(`${import.meta.env.VITE_URL_SPHERUS_API}/home/videos/`, {
					videoId: `${element.id}`,
					// eslint-disable-next-line react/destructuring-assignment
					sectionId: this.props.idSection,
				})
				.then(() => {
					// eslint-disable-next-line react/destructuring-assignment
					this.props.getHome();
					// eslint-disable-next-line react/destructuring-assignment
					this.props.setCheck(true);
				})
				.catch((err) => console.error(err));
		});
	};

	render() {
		return (
			<div className="set">
				{/* eslint-disable-next-line react/destructuring-assignment */}
				{this.state.bigShow === true && (
					<div className="set_adminHomeDragInComp">
						<DragDropContext onDragEnd={this.onDragEnd}>
							<Droppable droppableId="droppable">
								{(provided) => (
									<div
										className="set_adminHomeDragInComp_box"
										ref={provided.innerRef}
									>
										{/* eslint-disable-next-line react/destructuring-assignment */}
										<p>Category {this.state.catName.name}</p>
										{/* eslint-disable-next-line react/destructuring-assignment */}
										{this.state.items.map((item, index) => (
											<Draggable
												key={JSON.stringify(item.id)}
												draggableId={JSON.stringify(item.id)}
												index={index}
											>
												{/* eslint-disable-next-line react/destructuring-assignment, no-shadow */}
												{(provided) => (
													<div
														className="set_adminHomeDragInComp_box_div"
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														<p className="set_adminHomeDragInComp_box_div_title">
															{item.title}
														</p>
														<button
															className="set_adminHomeDragInComp_box_div_btn"
															type="button"
															onClick={() => {
																this.setState({
																	/* eslint-disable-next-line react/destructuring-assignment, react/no-access-state-in-setstate */
																	show: this.state.show ? null : item.id,
																});
															}}
														>
															Video sample
														</button>
														{/* eslint-disable-next-line react/destructuring-assignment */}
														{this.state.show && this.state.show === item.id && (
															<HoverVideoPlayer
																videoClassName="set_adminHomeDragInComp_box_div_video"
																className="set_adminHomeDragInComp_box_div_video"
																videoSrc={
																	`${import.meta.env.VITE_URL_SPHERUS_API}` +
																	`${item.url}`
																}
																muted
																playbackRangeStart={0}
																playbackRangeEnd={6}
															/>
														)}
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
							<Droppable droppableId="droppable2">
								{(provided) => (
									<div
										className="set_adminHomeDragInComp_box"
										ref={provided.innerRef}
									>
										{/* eslint-disable-next-line react/destructuring-assignment */}
										<p>Section carousel {this.state.catName.name}</p>
										{/* eslint-disable-next-line react/destructuring-assignment */}
										{this.state.selected.map((item, index) => (
											<Draggable
												key={JSON.stringify(item.id)}
												draggableId={JSON.stringify(item.id)}
												index={index}
											>
												{/* eslint-disable-next-line react/destructuring-assignment, no-shadow */}
												{(provided) => (
													<div
														className="set_adminHomeDragInComp_box_div"
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														<p className="set_adminHomeDragInComp_box_div_title">
															{item.title}
														</p>
														<button
															className="set_adminHomeDragInComp_box_div_btn"
															type="button"
															onClick={() => {
																this.setState({
																	/* eslint-disable-next-line react/destructuring-assignment, react/no-access-state-in-setstate */
																	show: this.state.show ? null : item.id,
																});
															}}
														>
															Video sample
														</button>
														{/* eslint-disable-next-line react/destructuring-assignment */}
														{this.state.show && this.state.show === item.id && (
															<HoverVideoPlayer
																videoClassName="set_adminHomeDragInComp_box_div_video"
																className="set_adminHomeDragInComp_box_div_video"
																videoSrc={
																	`${import.meta.env.VITE_URL_SPHERUS_API}` +
																	`${item.url}`
																}
																muted
																playbackRangeStart={0}
																playbackRangeEnd={6}
															/>
														)}
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</DragDropContext>
					</div>
				)}
				<button
					className="submitBtn set_btn"
					type="button"
					onClick={() => {
						this.postDisplayCarousel();
					}}
				>
					<div className="svg-wrapper">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="24"
							height="24"
						>
							<title>Submit button</title>
							<path fill="none" d="M0 0h24v24H0z" />
							<path
								fill="currentColor"
								d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
							/>
						</svg>
					</div>

					<span>Submit</span>
				</button>
			</div>
		);
	}
}

export default AdminHomeDragInComp;

AdminHomeDragInComp.propTypes = {
	idCat: PropTypes.string.isRequired,
	idSection: PropTypes.number.isRequired,
	setCheck: PropTypes.func.isRequired,
	getHome: PropTypes.func.isRequired,
};
