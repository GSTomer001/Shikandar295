import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('completedTasks');
    return saved ? JSON.parse(saved) : {};
  });

  const [activeWeek, setActiveWeek] = useState(1);

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const learningPlan = [
    {
      week: 1,
      title: "HTML & CSS Fundamentals",
      goal: "Master the building blocks of web pages - HTML structure and CSS styling",
      days: [
        { day: 1, task: "Learn HTML basics: tags, elements, attributes, document structure" },
        { day: 2, task: "Practice semantic HTML5: header, nav, main, article, section, footer" },
        { day: 3, task: "CSS fundamentals: selectors, properties, box model, display types" },
        { day: 4, task: "CSS layouts: Flexbox - create responsive navigation and card layouts" },
        { day: 5, task: "CSS Grid - build complex page layouts with rows and columns" },
        { day: 6, task: "Responsive design: media queries, mobile-first approach, viewport units" },
        { day: 7, task: "Project: Build a responsive portfolio landing page with HTML & CSS" }
      ],
      resources: [
        { name: "MDN Web Docs - HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", description: "Comprehensive HTML reference and tutorials" },
        { name: "CSS-Tricks Complete Guide to Flexbox", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", description: "Visual guide to mastering Flexbox" },
        { name: "freeCodeCamp Responsive Web Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", description: "Interactive HTML/CSS certification course" }
      ]
    },
    {
      week: 2,
      title: "JavaScript Essentials",
      goal: "Learn JavaScript fundamentals and DOM manipulation to make pages interactive",
      days: [
        { day: 1, task: "JavaScript basics: variables, data types, operators, conditionals, loops" },
        { day: 2, task: "Functions: declarations, expressions, arrow functions, parameters, return values" },
        { day: 3, task: "Arrays and Objects: methods, iteration, destructuring, spread operator" },
        { day: 4, task: "DOM manipulation: selecting elements, changing content, styles, attributes" },
        { day: 5, task: "Event handling: click, submit, keyboard events, event listeners" },
        { day: 6, task: "ES6+ features: let/const, template literals, modules, async/await basics" },
        { day: 7, task: "Project: Build an interactive to-do list app with local storage" }
      ],
      resources: [
        { name: "JavaScript.info", url: "https://javascript.info/", description: "Modern JavaScript tutorial from basics to advanced" },
        { name: "Eloquent JavaScript (Free Book)", url: "https://eloquentjavascript.net/", description: "In-depth JavaScript book with interactive examples" },
        { name: "MDN JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", description: "Complete JavaScript reference and guide" }
      ]
    },
    {
      week: 3,
      title: "React & Modern Frontend",
      goal: "Build dynamic user interfaces with React and understand component-based architecture",
      days: [
        { day: 1, task: "React basics: components, JSX, props, create-react-app setup" },
        { day: 2, task: "State management: useState hook, handling user input, controlled components" },
        { day: 3, task: "useEffect hook: side effects, API calls, cleanup, dependency array" },
        { day: 4, task: "Lists and keys, conditional rendering, component composition patterns" },
        { day: 5, task: "Forms in React: validation, multiple inputs, form submission handling" },
        { day: 6, task: "React Router: navigation, routes, links, URL parameters, nested routes" },
        { day: 7, task: "Project: Build a weather app using React with API integration" }
      ],
      resources: [
        { name: "React Official Documentation", url: "https://react.dev/", description: "Official React docs with interactive tutorials" },
        { name: "Scrimba React Course", url: "https://scrimba.com/learn/learnreact", description: "Interactive React course with hands-on coding" },
        { name: "React Tutorial by Net Ninja", url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d", description: "Comprehensive React video tutorial series" }
      ]
    },
    {
      week: 4,
      title: "Backend Basics & Full-Stack Integration",
      goal: "Understand backend development, APIs, databases, and deploy a full-stack application",
      days: [
        { day: 1, task: "Node.js & Express: setup, routing, middleware, handling requests/responses" },
        { day: 2, task: "RESTful APIs: GET, POST, PUT, DELETE endpoints, status codes, JSON" },
        { day: 3, task: "Database basics: MongoDB/PostgreSQL setup, CRUD operations, data modeling" },
        { day: 4, task: "Connecting frontend to backend: fetch API, axios, handling async data" },
        { day: 5, task: "Authentication basics: JWT tokens, password hashing, protected routes" },
        { day: 6, task: "Deployment: Git/GitHub, Vercel/Netlify (frontend), Render/Railway (backend)" },
        { day: 7, task: "Final Project: Build and deploy a full-stack CRUD app (blog or task manager)" }
      ],
      resources: [
        { name: "Node.js & Express Tutorial", url: "https://www.youtube.com/watch?v=Oe421EPjeBE", description: "Complete Node.js and Express crash course" },
        { name: "MongoDB University", url: "https://learn.mongodb.com/", description: "Free MongoDB courses and certifications" },
        { name: "Full Stack Open", url: "https://fullstackopen.com/en/", description: "University of Helsinki's full-stack course" }
      ]
    }
  ];

  const toggleTask = (week, day) => {
    const taskId = `${week}-${day}`;
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const getProgress = (week) => {
    const weekTasks = learningPlan[week - 1].days;
    const completed = weekTasks.filter(day => completedTasks[`${week}-${day.day}`]).length;
    return Math.round((completed / weekTasks.length) * 100);
  };

  const totalProgress = () => {
    const totalTasks = learningPlan.reduce((sum, week) => sum + week.days.length, 0);
    const completed = Object.values(completedTasks).filter(Boolean).length;
    return Math.round((completed / totalTasks) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Web Developer Learning Path</h1>
              <p className="text-gray-600 mt-1">Your 4-week journey to becoming a web developer</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-indigo-600">{totalProgress()}%</div>
              <div className="text-sm text-gray-600">Overall Progress</div>
            </div>
          </div>
        </div>
      </header>

      {/* Week Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {learningPlan.map((week) => (
            <button
              key={week.week}
              onClick={() => setActiveWeek(week.week)}
              className={`p-4 rounded-lg transition-all duration-200 ${
                activeWeek === week.week
                  ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              <div className="font-semibold text-lg">Week {week.week}</div>
              <div className="text-sm mt-1 opacity-90">{getProgress(week.week)}% Complete</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeWeek === week.week ? 'bg-white' : 'bg-indigo-600'
                  }`}
                  style={{ width: `${getProgress(week.week)}%` }}
                ></div>
              </div>
            </button>
          ))}
        </div>

        {/* Active Week Content */}
        {learningPlan.map((week) => (
          activeWeek === week.week && (
            <div key={week.week} className="space-y-6">
              {/* Week Header */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{week.title}</h2>
                <p className="text-gray-600 text-lg">{week.goal}</p>
              </div>

              {/* Daily Tasks */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Daily Tasks</h3>
                <div className="space-y-3">
                  {week.days.map((day) => {
                    const taskId = `${week.week}-${day.day}`;
                    const isCompleted = completedTasks[taskId];
                    return (
                      <div
                        key={day.day}
                        className={`flex items-start p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                          isCompleted
                            ? 'bg-green-50 border-green-300'
                            : 'bg-gray-50 border-gray-200 hover:border-indigo-300'
                        }`}
                        onClick={() => toggleTask(week.week, day.day)}
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                              isCompleted
                                ? 'bg-green-500 border-green-500'
                                : 'border-gray-300 hover:border-indigo-500'
                            }`}
                          >
                            {isCompleted && (
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center">
                            <span className="font-semibold text-indigo-600 mr-2">Day {day.day}</span>
                            <span className={`text-gray-700 ${isCompleted ? 'line-through opacity-60' : ''}`}>
                              {day.task}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Resources */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Top 3 Resources for This Week</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {week.resources.map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-500 hover:shadow-lg transition-all duration-200 group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {resource.name}
                        </h4>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">{resource.description}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Tips Section */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
                <h3 className="text-xl font-bold mb-3">💡 Pro Tips for Week {week.week}</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Dedicate 2-3 hours daily for focused learning and practice</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Build small projects alongside tutorials to reinforce concepts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Join developer communities (Discord, Reddit) for support and motivation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Don't rush - understanding is more important than speed</span>
                  </li>
                </ul>
              </div>
            </div>
          )
        ))}
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12">
        <div className="text-center text-gray-600 text-sm">
          <p>🚀 Stay consistent, practice daily, and you'll be building amazing web applications in no time!</p>
          <p className="mt-2">Your progress is automatically saved in your browser.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
