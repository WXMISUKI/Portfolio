import type { Profile } from '@/types/profile';

export const profile: Profile = {
  name: '罗雍来',
  title: '前端工程专家・AI 全栈开发者',
  subtitle: '罗雍来｜前端工程 & AI 全栈开发者作品集',
  description:
    '我是一名前端工程化与 AI 全栈复合型开发者，具备政企复杂业务系统落地经验，也能够独立完成智能体与大模型应用的全栈开发。长期聚焦 GIS 地图、大数据渲染、视频流低延迟优化、数据可视化大屏，以及对话式 AI 产品设计与交付。',
  avatar: '',
  tags: ['#技术驱动', '#性能优化', '#用户体验', '#团队协作', '#持续学习'],
  contact: {
    phone: '19042637070',
    email: '19042637070@139.com',
    github: 'https://github.com/WXMISUKI',
    linkedin: ''
  },
  jobExpectations: {
    positions: ['智能体开发工程师', '大模型应用工程师', '前端 + AI 全栈工程师'],
    cities: ['杭州', '舟山'],
    salary: '12k-16k'
  }
};

export const timeline = [
  {
    year: '2025',
    events: [
      {
        month: '08',
        title: 'TTS Pro 企业级语音合成',
        description: '大模型应用工程师,实现零样本音色克隆、高质量TTS、服务化部署',
        role: '大模型应用工程师'
      },
      {
        month: '07',
        title: '番剧智能体',
        description: '独立全栈负责人,实现11种意图体系、多轮记忆、指代消解',
        role: '独立全栈负责人'
      },
      {
        month: '06',
        title: '旅行规划智能体',
        description: '独立全栈负责人,实现7大类意图识别、自研SmartPlanner任务编排',
        role: '独立全栈负责人'
      },
      {
        month: '05',
        title: '远洋渔业智能驾驶舱',
        description: '前端核心开发,实现AI对话、流式输出、多维度数据可视化',
        role: '前端核心开发'
      },
      {
        month: '03',
        title: 'MyPrivateAgent 私有化 AI 助手',
        description: '独立全栈负责人,支持本地模型私有化部署、插件化系统',
        role: '独立全栈负责人'
      },
      {
        month: '02',
        title: '嘉兴公安海防反走私系统',
        description: '前端核心开发,首屏加载从25s优化到3s,处理万级点位高并发渲染',
        role: '前端核心开发'
      },
      {
        month: '01',
        title: '新奥海底管道预警系统',
        description: '前端核心负责人,视频延迟控制在1s内,首屏加载从3-5分钟优化到2-3秒',
        role: '前端核心负责人'
      }
    ]
  },
  {
    year: '2024',
    events: [
      {
        month: '07',
        title: '舟山大桥综管指挥平台',
        description: '前端核心开发,数据统计效率提升80%,实现多路视频低延迟播放',
        role: '前端核心开发'
      }
    ]
  }
];

export const metrics = [
  { label: '项目数量', value: 8, suffix: '+', prefix: '' },
  { label: '代码仓库', value: 7, suffix: '+', prefix: '' },
  { label: '技术文档', value: 20, suffix: '+', prefix: '' },
  { label: '性能优化', value: 50, suffix: '%', prefix: '平均提升' }
];

export const skillRadar = [
  { skill: '前端开发', value: 90 },
  { skill: '后端开发', value: 70 },
  { skill: 'GIS开发', value: 85 },
  { skill: 'AI开发', value: 75 },
  { skill: '系统架构', value: 80 }
];

export const personalTags = [
  '#技术驱动',
  '#性能优化',
  '#用户体验',
  '#团队协作',
  '#持续学习'
];

export const jobInfo = {
  status: '开放机会',
  availableTime: '随时',
  positions: [
    {
      title: '智能体开发工程师',
      description: '负责大模型应用和智能体开发,具备LangChain、LangGraph等框架经验'
    },
    {
      title: '大模型应用工程师',
      description: '负责大模型应用开发,具备RAG、意图识别、工具调用等经验'
    },
    {
      title: '前端 + AI 全栈工程师',
      description: '负责前端开发和AI应用开发,具备Vue3、Python、大模型等全栈能力'
    }
  ],
  cities: ['杭州', '舟山'],
  salary: '12k-16k'
};

export default profile;
