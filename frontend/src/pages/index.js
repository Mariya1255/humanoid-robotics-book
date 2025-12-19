import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import SetDarkModeDefault from '../components/SetDarkModeDefault';
import ChatbotWindow from '../components/ChatbotWindow';
import styles from './index.module.css';

// Define the ModuleCard component with enhanced styling
function ModuleCard({ title, description, link, icon, color = 'olive' }) {
  const colorClasses = {
    olive: 'module-card--olive',
    brown: 'module-card--brown',
    blue: 'module-card--blue',
    green: 'module-card--green',
    purple: 'module-card--purple',
    yellow: 'module-card--yellow',
    red: 'module-card--red'
  };

  return (
    <div className={clsx('col', 'col--4', 'margin-bottom--lg')}>
      <div className={clsx('card-demo', styles.moduleCard, styles[colorClasses[color]])}>
        <div className="card">
          <div className="card__header">
            <div className={styles.moduleIcon}>{icon}</div>
            <h3 className={styles.moduleTitle}>{title}</h3>
          </div>
          <div className="card__body">
            <p>{description}</p>
          </div>
          <div className="card__footer">
            <Link className="button button--secondary button--block" to={link}>
              Explore Module
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Define the TimelineItem component for the learning journey
function TimelineItem({ step, title, description, icon }) {
  return (
    <div className={clsx(styles.timelineItem, 'padding-vert--md')}>
      <div className={styles.timelineStep}>
        <div className={styles.timelineNumber}>{step}</div>
        <div className={styles.timelineContent}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

// Define the AssessmentCard component
function AssessmentCard({ title, items, link }) {
  return (
    <div className={clsx('col', 'col--6', 'margin-bottom--lg')}>
      <div className={clsx(styles.assessmentCard, styles['border-accent--red'])}>
        <h3>{title}</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.link ? <Link to={item.link}>{item.text}</Link> : item.text}
            </li>
          ))}
        </ul>
        {link && (
          <Link className="button button--secondary button--sm" to={link}>
            Learn More
          </Link>
        )}
      </div>
    </div>
  );
}

// Define the ResourceCard component
function ResourceCard({ title, description, link, icon }) {
  return (
    <div className={clsx('col', 'col--4', 'margin-bottom--lg')}>
      <div className={clsx(styles.resourceCard, styles['border-accent--purple'])}>
        <div className={styles.resourceIcon}>{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link className="button button--secondary button--sm" to={link}>
          Access Resource
        </Link>
      </div>
    </div>
  );
}

// Define the HardwareSpecCard component
function HardwareSpecCard({ title, specs, icon }) {
  return (
    <div className={clsx('col', 'col--6', 'margin-bottom--lg')}>
      <div className={clsx(styles.hardwareCard, styles['border-accent--purple'])}>
        <div className={styles.hardwareIcon}>{icon}</div>
        <h3>{title}</h3>
        <ul>
          {specs.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);
  }, []);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <Layout
      title={`Physical AI & Humanoid Robotics`}
      description="AI Robotics Textbook covering ROS 2, Digital Twin simulation, NVIDIA Isaac, VLA and Capstone project">
      <SetDarkModeDefault /> {/* Set dark mode as default */}



      <header className={clsx('hero hero--primary', styles.heroBanner, styles.heroOlive)}>
        <div className="container">
          <h1 className="hero__title">PHYSICAL AI & HUMANOID ROBOTICS</h1>
          <p className="hero__subtitle">AI Systems in the Physical World</p>
          <p className="hero__subtitle">Bridging the gap between <strong>digital intelligence</strong> and the <strong>physical body</strong> through humanoid robots.</p>
          <div className={clsx(styles.heroButtons, 'hero-buttons')}>
            <div>
              <Link
                className="button button--outline button--lg"
                to="/docs/modules">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Course Philosophy Section */}
        <section className={clsx(styles.section, styles.sectionPhilosophy)}>
          <div className="container padding-horiz--md">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <h2 className="text--center">COURSE PHILOSOPHY</h2>
                <div className={clsx(styles.philosophyGrid, 'philosophy-grid')}>
                  <div className={clsx(styles.philosophyCard, 'philosophy-card')}>
                    <div className={clsx(styles.philosophyIcon, 'philosophy-icon')}>🧠</div>
                    <h3>Digital Brain → Physical Body</h3>
                    <p>Understanding how AI systems can be embodied in physical robots to interact with the real world.</p>
                  </div>
                  <div className={clsx(styles.philosophyCard, 'philosophy-card')}>
                    <div className={clsx(styles.philosophyIcon, 'philosophy-icon')}>🤖</div>
                    <h3>Embodied Intelligence</h3>
                    <p>Exploring how physical interaction shapes AI learning and decision-making processes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modules Grid Section */}
        <section className={clsx(styles.section, styles.moduleSequenceSection)}>
          <div className="container padding-horiz--md">
            <div className="row">
              <div className="col col--10 col--offset-1">
                <h2 className="text--center">LEARNING PATH</h2>

                <div className="row padding-vert--md">
                  <ModuleCard
                    title="ROS 2"
                    description="Foundational communication infrastructure for robotics"
                    link="/docs/modules/ros2/"
                    icon="🤖"
                    color="olive"
                  />

                  <ModuleCard
                    title="DIGITAL-TWIN"
                    description="Creating and validating robot behaviors in simulation"
                    link="/docs/modules/digital-twin/"
                    icon="🎮"
                    color="brown"
                  />

                  <ModuleCard
                    title="NVIDIA-ISAAC"
                    description="AI-powered perception and navigation"
                    link="/docs/modules/nvidia-isaac/"
                    icon="🧠"
                    color="green"
                  />

                  <ModuleCard
                    title="VLA (Vision-Language-Action)"
                    description="Integrating vision, language, and action for intelligent robot behavior"
                    link="/docs/modules/vla/"
                    icon="👁️"
                    color="purple"
                  />

                  <ModuleCard
                    title="CAPSTONE"
                    description="Integrating all modules into a complete humanoid robot project"
                    link="/docs/modules/capstone/"
                    icon="🏆"
                    color="red"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Timeline */}
        <section className={clsx(styles.section, styles.gettingStartedSection)}>
          <div className="container padding-horiz--md">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <h2 className="text--center">YOUR LEARNING JOURNEY</h2>
                <div className={clsx(styles.timelineContainer, 'timeline-container')}>
                  <TimelineItem
                    step="1"
                    title="Environment Setup"
                    description="Install required tools and dependencies for the course"
                    icon="⚙️"
                  />
                  <TimelineItem
                    step="2"
                    title="ROS 2 Fundamentals"
                    description="Learn core ROS 2 concepts and architecture"
                    icon="📚"
                  />
                  <TimelineItem
                    step="3"
                    title="Simulation Environment"
                    description="Set up Gazebo and Unity for robot simulation"
                    icon="🎮"
                  />
                  <TimelineItem
                    step="4"
                    title="AI Integration"
                    description="Integrate NVIDIA Isaac for perception and navigation"
                    icon="🧠"
                  />
                  <TimelineItem
                    step="5"
                    title="VLA Systems"
                    description="Implement Vision-Language-Action capabilities"
                    icon="👁️"
                  />
                  <TimelineItem
                    step="6"
                    title="Capstone Project"
                    description="Integrate all components in the final project"
                    icon="🏆"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hardware Requirements */}
        <section className={clsx(styles.section, styles.hardwareRequirementsSection)}>
          <div className="container padding-horiz--md">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <h2 className="text--center">HARDWARE REQUIREMENTS</h2>

                <div className="row padding-vert--lg">
                  <HardwareSpecCard
                    title="Digital Twin Workstation"
                    icon="💻"
                    specs={[
                      "RTX GPU (4070 Ti minimum)",
                      "Ubuntu 22.04",
                      "64GB RAM",
                      "8+ core CPU"
                    ]}
                  />

                  <HardwareSpecCard
                    title="Physical AI Edge Kit"
                    icon="⚡"
                    specs={[
                      "Jetson Orin Nano / NX",
                      "RealSense D435i",
                      "IMU, Microphone array",
                      "Custom robot platform"
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className={clsx('hero hero--primary', styles.ctaSection, styles.ctaOlive)}>
          <div className="container text--center">
            <h2>Ready to Start Building Physical AI?</h2>
            <p>Begin your journey into humanoid robotics and embodied intelligence</p>
            <div className={clsx(styles.ctaButtons, 'cta-buttons')}>
              <Link
                className="button button--primary button--lg margin-horiz--md"
                to="/docs/modules/ros2/introduction">
                Begin Your Journey
              </Link>
              <Link
                className="button button--secondary button--lg margin-horiz--md"
                to="/docs/modules">
                Explore All Modules
              </Link>
            </div>
          </div>
        </section>

        {/* Keep remaining sections for now */}
        {/* Learning Outcomes with Green Accent Border */}
        <section className={clsx(styles.section, styles.learningOutcomesSection)}>
          <div className="container padding-horiz--md">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <h2 className="text--center">LEARNING OUTCOMES</h2>
                <div className={clsx(styles.learningOutcomesCard, styles['border-accent--green'])}>
                  <ul className={styles.outcomeList}>
                    <li>Master ROS 2 concepts and implementation for humanoid robotics</li>
                    <li>Simulate robots with both Gazebo and Unity for comprehensive testing</li>
                    <li>Develop AI-powered perception and navigation with NVIDIA Isaac</li>
                    <li>Integrate Vision-Language-Action capabilities for natural robot interaction</li>
                    <li>Integrate GPT models for cognitive planning and decision-making</li>
                    <li>Build conversational robotic systems using voice commands</li>
                    <li>Validate robot behaviors in both simulation and real-world environments</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Breakdown with Yellow Accent */}
        <section className={clsx(styles.section, styles.weeklyBreakdownSection)}>
          <div className="container padding-horiz--md">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <h2 className="text--center">WEEKLY BREAKDOWN</h2>

                <div className={clsx(styles.weeklyCard, styles['border-accent--yellow'])}>
                  <details className="padding-vert--md">
                    <summary><strong>Weeks 1–2: Foundations</strong></summary>
                    <p>Introduction to robotics concepts, setup, and foundational tools</p>
                  </details>

                  <details className="padding-vert--md">
                    <summary><strong>Weeks 3–5: ROS 2 Fundamentals</strong></summary>
                    <p>Core ROS 2 concepts, nodes, topics, and services</p>
                  </details>

                  <details className="padding-vert--md">
                    <summary><strong>Weeks 6–7: Digital Twin Simulation</strong></summary>
                    <p>Gazebo and Unity simulation environment setup</p>
                  </details>

                  <details className="padding-vert--md">
                    <summary><strong>Weeks 8–10: NVIDIA Isaac</strong></summary>
                    <p>AI perception, navigation, and Isaac tools</p>
                  </details>

                  <details className="padding-vert--md">
                    <summary><strong>Weeks 11–12: VLA Integration</strong></summary>
                    <p>Vision-Language-Action systems and integration</p>
                  </details>

                  <details className="padding-vert--md">
                    <summary><strong>Week 13: Capstone Integration</strong></summary>
                    <p>Integrating all modules and final project completion</p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Assessments with Red Border Cards */}
        <section className={clsx(styles.section, styles.assessmentSection)}>
          <div className="container padding-horiz--md">
            <div className="row">
              <div className="col col--10 col--offset-1">
                <h2 className="text--center">ASSESSMENTS</h2>

                <div className="row padding-vert--md">
                  <AssessmentCard
                    title="Module-Specific Assessments"
                    items={[
                      { text: "ROS 2 Exercises", link: "/docs/modules/ros2/exercises/" },
                      { text: "Digital Twin Simulation Exercises", link: "/docs/modules/digital-twin/exercises/" },
                      { text: "NVIDIA Isaac Exercises", link: "/docs/modules/nvidia-isaac/exercises/" },
                      { text: "VLA Integration Exercises", link: "/docs/modules/vla/exercises/" }
                    ]}
                  />
                  <AssessmentCard
                    title="Capstone Project Assessment"
                    items={[
                      { text: "Comprehensive Capstone Project", link: "/docs/modules/capstone/project-outline" },
                      { text: "Performance evaluation and validation" },
                      { text: "Presentation and demonstration" }
                    ]}
                    link="/docs/modules/capstone/"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className={clsx(styles.section, styles.resourcesSection)}>
          <div className="container padding-horiz--md">
            <div className="row">
              <div className="col col--10 col--offset-1">
                <h2 className="text--center">ADDITIONAL RESOURCES</h2>

                <div className="row padding-vert--md">
                  <ResourceCard
                    title="Documentation"
                    description="Comprehensive guides and API references for all modules"
                    link="/docs/"
                    icon="📚"
                  />
                  <ResourceCard
                    title="Code Examples"
                    description="Sample implementations and best practices"
                    link="/docs/examples"
                    icon="💻"
                  />
                  <ResourceCard
                    title="Community Forum"
                    description="Connect with other students and experts"
                    link="/community"
                    icon="💬"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deployment Options */}
        <section className={clsx('hero hero--primary', styles.deploymentSection)}>
          <div className="container text--center">
            <h2>Deployment Options</h2>
            <p>This textbook is deployed on both GitHub Pages and Vercel for maximum accessibility</p>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg margin-horiz--md"
                to="/docs/deployment-options">
                View Deployment Guide
              </Link>
              <Link
                className="button button--outline button--secondary button--lg margin-horiz--md"
                to="/docs/vercel-deployment">
                Vercel Deployment Info
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}