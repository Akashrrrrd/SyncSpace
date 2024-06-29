import React, { useState } from 'react';
import Modal from '../../Components/Modal/Modal'
import './ProjectOverview.css';

const ProjectOverview = () => {
    const [showModal, setShowModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        teamLead: '',
        teamMembers: '',
        status: 'Not Started' 
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddProject = () => {
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProjects([...projects, formData]);
        setShowModal(false);
        setFormData({
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            teamLead: '',
            teamMembers: '',
            status: 'Not Started'
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="project-overview">
            <div className="header">
                <h1>Project Overview</h1>
                <button className="add-project-button" onClick={handleAddProject}>
                    + Add Project
                </button>
            </div>
            {projects.map((project, index) => (
                <div key={index} className="project-summary">
                    <h2>{project.title}</h2>
                    <p className="description">{project.description}</p>
                    <div className="project-dates">
                        <p><strong>Start Date:</strong> {project.startDate}</p>
                        <p><strong>End Date:</strong> {project.endDate}</p>
                    </div>
                    <p className="status"><strong>Status:</strong> {project.status}</p>
                </div>
            ))}
            <div className="grid-container">
                <div className="grid-item team-members">
                    <h2>Team Members</h2>
                    <ul>
                        <li><span>John Doe</span> - Project Manager</li>
                        <li><span>Jane Smith</span> - Lead Developer</li>
                        <li><span>Tom Brown</span> - UX Designer</li>
                        <li><span>Emily Davis</span> - QA Engineer</li>
                    </ul>
                </div>
                <div className="grid-item milestones">
                    <h2>Milestones</h2>
                    <ul>
                        <li>Milestone 1: Project Kickoff - Completed</li>
                        <li>Milestone 2: Design Phase - In Progress</li>
                        <li>Milestone 3: Development Phase - Pending</li>
                        <li>Milestone 4: Testing Phase - Pending</li>
                        <li>Milestone 5: Launch - Pending</li>
                    </ul>
                </div>
                <div className="grid-item tasks-overview">
                    <h2>Tasks Overview</h2>
                    <p><strong>Total Tasks:</strong> 50</p>
                    <p><strong>To Do:</strong> 20</p>
                    <p><strong>In Progress:</strong> 15</p>
                    <p><strong>Completed:</strong> 15</p>
                </div>
                <div className="grid-item activity-feed">
                    <h2>Activity Feed</h2>
                    <ul>
                        <li>John Doe commented on <strong>Task 5</strong></li>
                        <li>Jane Smith completed <strong>Task 10</strong></li>
                        <li>Tom Brown updated <strong>Task 3</strong></li>
                    </ul>
                </div>
                <div className="grid-item gantt-chart">
                    <h2>Gantt Chart</h2>
                </div>
                <div className="grid-item key-metrics">
                    <h2>Key Metrics and KPIs</h2>
                    <p><strong>Budget Used:</strong> $10,000 / $50,000</p>
                    <p><strong>Resources Allocated:</strong> 5 / 10</p>
                    <p><strong>Progress:</strong> 30%</p>
                </div>
                <div className="grid-item files-documents">
                    <h2>Files and Documents</h2>
                    <ul>
                        <li><a href="#">Project Plan.pdf</a></li>
                        <li><a href="#">Design Mockups.zip</a></li>
                        <li><a href="#">Requirements.docx</a></li>
                    </ul>
                </div>
                <div className="grid-item risks-issues">
                    <h2>Risks and Issues</h2>
                    <ul>
                        <li><strong>Risk 1:</strong> Delayed Delivery - Mitigation: Increase resources</li>
                        <li><strong>Issue 2:</strong> Requirement Changes - Resolution: Scope reassessment</li>
                    </ul>
                </div>
            </div>
            {showModal && (
                <Modal title="Add New Project" onClose={handleCloseModal}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Project Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Project Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Team Lead</label>
                            <input
                                type="text"
                                name="teamLead"
                                value={formData.teamLead}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Team Members</label>
                            <input
                                type="text"
                                name="teamMembers"
                                value={formData.teamMembers}
                                onChange={handleInputChange}
                                required
                                placeholder="Comma-separated names"
                            />
                        </div>
                        <div className="form-group">
                            <label>Project Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className="modal-actions">
                            <button type="button" onClick={handleCloseModal}>Cancel</button>
                            <button type="submit">Add Project</button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default ProjectOverview;
