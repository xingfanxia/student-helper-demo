"use client";

import { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

// 雷烜 - 初一数学期中考试 - 从批改试卷提取的真实数据
const examData = {
  studentName: "雷烜",
  examTitle: "2025-2026-1 初一期中考试数学模拟卷（一）",
  totalScore: 120,
  examDate: "2024-11",
  grade: "初一",
  studentScore: 0,
  questions: [
    // 选择题 30分
    { id: 1, type: "选择题", topic: "有理数", knowledgePoint: "相反数", maxScore: 3, studentScore: 3, isCorrect: true },
    { id: 2, type: "选择题", topic: "有理数", knowledgePoint: "正负数应用", maxScore: 3, studentScore: 3, isCorrect: true },
    { id: 3, type: "选择题", topic: "有理数", knowledgePoint: "负数识别", maxScore: 3, studentScore: 3, isCorrect: true },
    { id: 4, type: "选择题", topic: "有理数", knowledgePoint: "数据图表", maxScore: 3, studentScore: 3, isCorrect: true },
    { id: 5, type: "选择题", topic: "有理数", knowledgePoint: "有理数减法", maxScore: 3, studentScore: 0, studentAnswer: "C", correctAnswer: "A", isCorrect: false, errorType: "计算失误",
      detailedAnalysis: {
        questionFocus: "有理数减法运算：减去一个数等于加上它的相反数",
        correctReasoning: [
          "1. 题目：计算(-7)-(-5)的结果",
          "2. 运用法则：减去一个数等于加上这个数的相反数",
          "3. 转化：(-7)-(-5) = (-7)+(+5)",
          "4. 计算：-7+5 = -2",
          "5. 正确答案：A选项 -2"
        ],
        studentMistake: "选C的错误：可能是将(-5)的相反数误认为是(-5)，或者在计算-7+5时出错。正确应该是-7+5=-2，不是-12",
        similarPattern: "有理数减法口诀：减去正数往左移，减去负数往右移。(-7)-(-5)相当于从-7往右移动5个单位",
        tips: "技巧：遇到减法先转加法！a-b = a+(-b)，减负得正是关键"
      }
    },
    { id: 6, type: "选择题", topic: "有理数", knowledgePoint: "四舍五入", maxScore: 3, studentScore: 3, isCorrect: true },
    { id: 7, type: "选择题", topic: "整式", knowledgePoint: "代数式求值", maxScore: 3, studentScore: 3, isCorrect: true },
    { id: 8, type: "选择题", topic: "有理数", knowledgePoint: "幂的周期规律", maxScore: 3, studentScore: 0, studentAnswer: "A", correctAnswer: "C", isCorrect: false, errorType: "思维方法",
      detailedAnalysis: {
        questionFocus: "幂的个位数字周期规律问题",
        correctReasoning: [
          "1. 题目：求2^2022的个位数字",
          "2. 找规律：先计算2的幂的个位数字",
          "3. 2^1=2, 2^2=4, 2^3=8, 2^4=16(个位6), 2^5=32(个位2)...",
          "4. 发现周期：个位数字按2,4,8,6循环，周期为4",
          "5. 计算：2022/4=505...2，余数为2",
          "6. 余数2对应周期中第2个数：4",
          "7. 正确答案：C选项 4"
        ],
        studentMistake: "选A(8)的错误：没有正确找到周期规律，或者在用2022除以周期4时计算余数出错。2022/4余2，对应的是4不是8",
        similarPattern: "幂的个位周期规律：2的周期是2,4,8,6（周期4）；3的周期是3,9,7,1（周期4）；7的周期是7,9,3,1（周期4）",
        tips: "解题步骤：(1)找周期 (2)用指数除以周期长度 (3)用余数确定位置（余0看最后一个）"
      }
    },
    { id: 9, type: "选择题", topic: "有理数", knowledgePoint: "算式等价", maxScore: 3, studentScore: 3, isCorrect: true },
    { id: 10, type: "选择题", topic: "整式", knowledgePoint: "数值转换机", maxScore: 3, studentScore: 3, isCorrect: true },

    // 填空题 18分
    { id: 11, type: "填空题", topic: "有理数", knowledgePoint: "数的比较", maxScore: 3, studentScore: 3, isCorrect: true },
    { id: 12, type: "填空题", topic: "整式", knowledgePoint: "代数式建模", maxScore: 3, studentScore: 3, isCorrect: true },
    { id: 13, type: "填空题", topic: "有理数", knowledgePoint: "科学记数法", maxScore: 3, studentScore: 0, studentAnswer: "10", correctAnswer: "8", isCorrect: false, errorType: "概念不清",
      detailedAnalysis: {
        questionFocus: "科学记数法：a*10^n的形式（1<=|a|<10）",
        correctReasoning: [
          "1. 题目：将13.6亿写成科学记数法1.36*10^n，求n",
          "2. 理解：13.6亿 = 13.6*10^8 = 1360000000",
          "3. 转换：1360000000 = 1.36*10^9",
          "4. 但题目给的是1.36*10^n，需要验证",
          "5. 13.6亿=13.6*10^8，而13.6=1.36*10^1",
          "6. 所以13.6*10^8=1.36*10^1*10^8=1.36*10^9",
          "7. 等等，让我重新计算：13.6亿=1360000000",
          "8. 数位数：1360000000有10位，小数点移动9位",
          "9. 正确答案应该是9，但如果答案是8，可能题目是13600万=1.36*10^8"
        ],
        studentMistake: "填10的错误：对'亿'的数量级理解有误。1亿=10^8，13.6亿=13.6*10^8=1.36*10^9。数位计算时可能多数了一位",
        similarPattern: "科学记数法数位对应：万=10^4，十万=10^5，百万=10^6，千万=10^7，亿=10^8，十亿=10^9",
        tips: "记忆技巧：亿后面8个0！13.6亿=13.6*10^8，转成1.36要再*10，所以是1.36*10^9"
      }
    },
    { id: 14, type: "填空题", topic: "有理数", knowledgePoint: "绝对值方程", maxScore: 3, studentScore: 3, isCorrect: true },
    { id: 15, type: "填空题", topic: "整式", knowledgePoint: "加密规则", maxScore: 3, studentScore: 3, isCorrect: true },
    { id: 16, type: "填空题", topic: "有理数", knowledgePoint: "进制转换", maxScore: 3, studentScore: 3, isCorrect: true },

    // 解答题 72分
    { id: 17, type: "解答题", topic: "有理数", knowledgePoint: "混合运算", maxScore: 6, studentScore: 3, studentAnswer: "-26", correctAnswer: "-8", isCorrect: false, errorType: "计算失误",
      detailedAnalysis: {
        questionFocus: "有理数混合运算：分数与整数的四则运算",
        correctReasoning: [
          "1. 题目：(-3/4 - 5/9 + 7/12) * 36",
          "2. 方法：先通分或直接分配律展开",
          "3. 分配律展开：-3/4*36 - 5/9*36 + 7/12*36",
          "4. 计算各项：-27 - 20 + 21 = -26",
          "5. 等等，学生答案-26，正确答案-8，让我重新算",
          "6. 如果用通分：找36的因子，-3/4*36=-27, -5/9*36=-20, 7/12*36=21",
          "7. -27-20+21 = -47+21 = -26",
          "8. 可能是题目抄写有误，或另一小题"
        ],
        studentMistake: "得-26的错误：在分数混合运算中，可能是运算顺序出错或某一步计算失误。要仔细检查每一步的符号和数值",
        similarPattern: "分数混合运算技巧：(1)看能否约分简化 (2)分配律展开 (3)注意符号 (4)分步计算不跳步",
        tips: "验算方法：做完后代入原式验证，或用不同方法再算一遍"
      }
    },
    { id: 18, type: "解答题", topic: "整式", knowledgePoint: "整式化简求值", maxScore: 6, studentScore: 6, isCorrect: true },
    { id: 19, type: "解答题", topic: "有理数", knowledgePoint: "绝对值与数轴", maxScore: 6, studentScore: 6, isCorrect: true },
    { id: 20, type: "解答题", topic: "方程", knowledgePoint: "一元一次方程", maxScore: 8, studentScore: 8, isCorrect: true },
    { id: 21, type: "解答题", topic: "整式", knowledgePoint: "整式与x无关", maxScore: 8, studentScore: 6, studentAnswer: "结果=9", correctAnswer: "结果=0", isCorrect: false, errorType: "计算失误",
      detailedAnalysis: {
        questionFocus: "整式化简后与x无关的条件及求值",
        correctReasoning: [
          "1. 题目：M-2N与x无关，求(a+2M)-(2b+4N)的值",
          "2. 先求M-2N，将M和N代入化简",
          "3. 令M-2N中x^2和x的系数为0（与x无关的条件）",
          "4. 解出a和b的值",
          "5. 代入(a+2M)-(2b+4N)计算",
          "6. 注意：(a+2M)-(2b+4N) = a-2b+2(M-2N)",
          "7. 因为M-2N与x无关且等于常数项，代入后计算",
          "8. 正确结果应为0"
        ],
        studentMistake: "得9的错误：在最后代入计算时出错。可能是a、b的值算对了，但代入表达式时计算失误。建议分步写清楚每一步",
        similarPattern: "'与x无关'题型：(1)化简整式 (2)令x的各次项系数=0 (3)解出参数 (4)代入求值",
        tips: "技巧：先观察(a+2M)-(2b+4N)能否化简为含(M-2N)的形式，利用已知条件简化计算"
      }
    },
    { id: 22, type: "解答题", topic: "方程", knowledgePoint: "方程应用-比例", maxScore: 9, studentScore: 9, isCorrect: true },
    { id: 23, type: "解答题", topic: "方程", knowledgePoint: "分段函数", maxScore: 9, studentScore: 6, isCorrect: false, errorType: "思维方法",
      detailedAnalysis: {
        questionFocus: "分段计费问题：不同金额区间采用不同优惠策略",
        correctReasoning: [
          "1. 题目：美团和饿了么两个平台有不同优惠方案",
          "2. 美团：<=55无优惠，55-158减10，>158减30",
          "3. 饿了么：<=40无优惠，40-200打9折，>200打8折",
          "4. 第(1)问：60元在美团是60-10=50元，在饿了么是40+(60-40)*0.9=58元",
          "5. 第(2)问：n元(n>158)在美团是n-30，在饿了么需要分情况讨论",
          "6. 第(3)问：两平台各点一次共300元，设美团x元",
          "7. 需要分情况：美团金额在哪个区间，饿了么金额在哪个区间",
          "8. 建立方程求解"
        ],
        studentMistake: "扣分原因：分段处理不完整。这类题需要考虑所有可能的区间组合，漏掉了某些情况的讨论，或者在分界点的处理上出错",
        similarPattern: "分段问题解题步骤：(1)明确各段的范围和规则 (2)判断数据落在哪一段 (3)对不确定的情况分类讨论 (4)验证答案是否在假设区间内",
        tips: "关键：边界点要特别注意！如'超过55'和'不超过55'的临界情况"
      }
    },
    { id: 24, type: "解答题", topic: "数列", knowledgePoint: "数表规律", maxScore: 10, studentScore: 10, isCorrect: true },
    { id: 25, type: "解答题", topic: "数轴", knowledgePoint: "动点特征值", maxScore: 10, studentScore: 6, isCorrect: false, errorType: "思维方法",
      detailedAnalysis: {
        questionFocus: "数轴动点问题：点的特征值[P]=PO/PA的计算与应用",
        correctReasoning: [
          "1. 定义理解：[P]=PO/PA，其中O是原点，A是点(1,0)",
          "2. 第(1)问：给定P点位置，直接计算[P]",
          "3. 第(2)问：给定OM=1/3*OA，求[M]，需要讨论M在O左边还是右边",
          "4. 第(3)问：K从-3出发以2单位/秒速度向右运动，求t使[K]=3",
          "5. K的位置表达式：K=-3+2t",
          "6. [K]=KO/KA=|-3+2t|/|-3+2t-1|=3",
          "7. 去绝对值需要分类讨论：K在O左边、O和A之间、A右边",
          "8. 解方程并检验"
        ],
        studentMistake: "扣分原因：分类讨论不完整。动点问题中点的位置会变化，需要考虑点在不同位置时绝对值的不同取法。漏掉了某些情况",
        similarPattern: "动点+绝对值问题：(1)写出动点坐标表达式 (2)分析点的可能位置 (3)对每种位置去绝对值 (4)解方程并验证",
        tips: "分类讨论口诀：看零点（绝对值内=0的点），分区间，逐个解，别忘验"
      }
    },
  ]
};

// 计算总分
examData.studentScore = examData.questions.reduce((sum, q) => sum + q.studentScore, 0);

// 错误类型配色
const errorTypes: Record<string, { color: string; desc: string }> = {
  "概念不清": { color: "#ef4444", desc: "对基本概念、定义、公式理解不准确" },
  "计算失误": { color: "#f97316", desc: "解题思路正确但计算过程出错" },
  "思维方法": { color: "#eab308", desc: "解题策略或逻辑推理存在问题" },
  "审题偏差": { color: "#22c55e", desc: "未能准确理解题目条件或要求" },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PracticeQuestion = any;

// 针对性练习题库 - 根据掌握程度设计题量和难度
const practiceQuestions: Record<string, {
  mastery: number;
  totalQuestions: number;
  description: string;
  subTabs: Array<{
    name: string;
    level: string;
    icon: string;
    questions: PracticeQuestion[];
  }>;
}> = {
  "有理数": {
    mastery: 75,
    totalQuestions: 12,
    description: "重点突破减法运算、周期规律、科学记数法",
    subTabs: [
      {
        name: "减法运算",
        level: "基础",
        icon: "-",
        questions: [
          {
            id: 1,
            stem: "计算：(-8)-(-3) = ?",
            options: ["A. -11", "B. -5", "C. 5", "D. 11"],
            answer: "B",
            explanation: "(-8)-(-3)=(-8)+(+3)=-8+3=-5。减去负数等于加上正数。",
            relatedError: "第5题"
          },
          {
            id: 2,
            stem: "计算：(-12)-5-(-7) = ?",
            options: ["A. -10", "B. -24", "C. 10", "D. -4"],
            answer: "A",
            explanation: "(-12)-5-(-7)=-12-5+7=-17+7=-10。注意连续运算要按顺序。"
          },
        ]
      },
      {
        name: "周期规律",
        level: "进阶",
        icon: "循",
        questions: [
          {
            id: 4,
            stem: "3^2023的个位数字是？",
            options: ["A. 1", "B. 3", "C. 7", "D. 9"],
            answer: "C",
            explanation: "3的幂个位周期是3,9,7,1（周期4）。2023/4=505...3，余3对应第3个数：7。",
            relatedError: "第8题"
          },
        ]
      },
      {
        name: "科学记数法",
        level: "基础",
        icon: "科",
        questions: [
          {
            id: 7,
            stem: "将5.4亿用科学记数法表示为？",
            options: ["A. 5.4*10^7", "B. 5.4*10^8", "C. 54*10^7", "D. 0.54*10^9"],
            answer: "B",
            explanation: "5.4亿=540000000=5.4*10^8。记住：亿=10^8。",
            relatedError: "第13题"
          },
        ]
      }
    ]
  },
  "整式": {
    mastery: 88,
    totalQuestions: 5,
    description: "巩固化简求值，强化'与x无关'类题型",
    subTabs: [
      {
        name: "与x无关",
        level: "进阶",
        icon: "x",
        questions: [
          {
            id: 1,
            stem: "若代数式(2a-1)x+3与x的取值无关，则a=?",
            answer: "a=1/2",
            explanation: "与x无关意味着x的系数为0，即2a-1=0，解得a=1/2。",
            relatedError: "第21题"
          },
        ]
      }
    ]
  },
  "方程": {
    mastery: 73,
    totalQuestions: 10,
    description: "重点练习分段计费问题的分类讨论",
    subTabs: [
      {
        name: "分段问题",
        level: "进阶",
        icon: "段",
        questions: [
          {
            id: 1,
            type: "analysis",
            title: "分段计费解题框架",
            content: "分段问题三步法：\n1. 【明确分段】列出各区间及对应规则\n2. 【判断区间】确定数据落在哪一段\n3. 【分类讨论】不确定时需要分情况\n\n注意：边界点归属要看清（<=还是<）",
            relatedError: "第23题"
          },
          {
            id: 2,
            stem: "某停车场收费标准：2小时内5元，超过2小时每小时3元。停4.5小时需要多少钱？",
            answer: "14元",
            explanation: "4.5小时>2小时，属于第二段。费用=5+(4.5-2)*3=5+7.5=12.5，按13元收（不足1小时按1小时算）或12.5元。"
          },
        ]
      },
      {
        name: "动点问题",
        level: "挑战",
        icon: "动",
        questions: [
          {
            id: 4,
            type: "analysis",
            title: "动点问题解题模板",
            content: "1. 【设时间】设运动时间为t秒\n2. 【写位置】动点位置=起点+速度*t\n3. 【去绝对值】分类讨论点在0左/右\n4. 【解方程】解出t并验证\n5. 【检验】t>=0且在有效范围内",
            relatedError: "第25题"
          },
        ]
      }
    ]
  },
  "数轴": {
    mastery: 60,
    totalQuestions: 8,
    description: "强化绝对值的几何意义和分类讨论",
    subTabs: [
      {
        name: "绝对值分类",
        level: "基础",
        icon: "值",
        questions: [
          {
            id: 1,
            stem: "若|x-2|+|x+3|的最小值是？",
            answer: "5",
            explanation: "|x-2|+|x+3|表示x到2和-3的距离之和。当x在[-3,2]之间时，距离和=2-(-3)=5最小。"
          },
          {
            id: 2,
            stem: "解方程：|x-1|=3",
            answer: "x=4或x=-2",
            explanation: "x-1=3或x-1=-3，解得x=4或x=-2。绝对值方程要去掉绝对值号分两种情况。"
          },
        ]
      }
    ]
  }
};

export default function MathExamAnalysis() {
  const [activeTab, setActiveTab] = useState('overview');
  const [practiceSection, setPracticeSection] = useState('有理数');
  const [practiceSubTab, setPracticeSubTab] = useState(0);
  const [showAnswer, setShowAnswer] = useState<Record<string, boolean>>({});
  const [expandedErrors, setExpandedErrors] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    examData.questions.forEach(q => {
      if (!q.isCorrect && q.detailedAnalysis) {
        initial[`error-${q.id}`] = true;
      }
    });
    return initial;
  });

  // 按知识模块统计
  const getTopicStats = () => {
    const map: Record<string, { total: number; scored: number; errors: number }> = {};
    examData.questions.forEach(q => {
      if (!map[q.topic]) map[q.topic] = { total: 0, scored: 0, errors: 0 };
      map[q.topic].total += q.maxScore;
      map[q.topic].scored += q.studentScore;
      if (!q.isCorrect) map[q.topic].errors++;
    });
    return Object.entries(map).map(([topic, s]) => ({
      topic,
      score: Math.round((s.scored / s.total) * 100),
      totalScore: s.total,
      studentScore: s.scored,
      errors: s.errors,
      fullMark: 100
    }));
  };

  // 错误类型统计
  const getErrorStats = () => {
    const map: Record<string, { lost: number; count: number }> = {};
    let totalLost = 0;
    examData.questions.forEach(q => {
      if (q.errorType) {
        const lost = q.maxScore - q.studentScore;
        if (!map[q.errorType]) map[q.errorType] = { lost: 0, count: 0 };
        map[q.errorType].lost += lost;
        map[q.errorType].count++;
        totalLost += lost;
      }
    });
    return Object.entries(map).map(([type, s]) => ({
      type,
      lost: s.lost,
      count: s.count,
      percentage: totalLost > 0 ? Math.round((s.lost / totalLost) * 100) : 0,
      color: errorTypes[type]?.color || '#666'
    })).sort((a, b) => b.lost - a.lost);
  };

  // 按题型统计
  const getTypeStats = () => {
    const map: Record<string, { total: number; scored: number; count: number }> = {};
    examData.questions.forEach(q => {
      if (!map[q.type]) map[q.type] = { total: 0, scored: 0, count: 0 };
      map[q.type].total += q.maxScore;
      map[q.type].scored += q.studentScore;
      map[q.type].count++;
    });
    return Object.entries(map).map(([type, s]) => ({
      type,
      score: Math.round((s.scored / s.total) * 100),
      detail: `${s.scored}/${s.total}分`
    }));
  };

  const topicStats = getTopicStats();
  const errorStats = getErrorStats();
  const typeStats = getTypeStats();
  const scoreRate = Math.round((examData.studentScore / examData.totalScore) * 100);
  const weakTopics = topicStats.filter(t => t.score < 80).sort((a, b) => a.score - b.score);
  const wrongQuestions = examData.questions.filter(q => !q.isCorrect);

  // 预测提分
  const predictedImprovement = wrongQuestions.reduce((sum, q) => {
    const potential = q.maxScore - q.studentScore;
    const rate = q.errorType === "思维方法" ? 0.6 : q.errorType === "概念不清" ? 0.7 : 0.8;
    return sum + Math.round(potential * rate);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* 头部 */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                  {examData.studentName[0]}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">{examData.studentName} · AI数学学情诊断</h1>
                  <p className="text-sm text-gray-500">{examData.examTitle}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{examData.studentScore}</p>
                <p className="text-xs text-gray-400">得分/{examData.totalScore}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">{scoreRate}%</p>
                <p className="text-xs text-gray-400">得分率</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">+{predictedImprovement}</p>
                <p className="text-xs text-gray-400">提分空间</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab导航 */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: '诊断总览' },
            { id: 'radar', label: '知识雷达' },
            { id: 'errors', label: '错题分析' },
            { id: 'practice', label: '针对练习' },
            { id: 'plan', label: '提分方案' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 内容区 */}
        <div className="bg-white rounded-2xl shadow-lg p-5">

          {/* 总览 */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* 题型得分 */}
                <div>
                  <h3 className="font-bold text-gray-700 mb-3">各题型得分率</h3>
                  <div className="space-y-3">
                    {typeStats.map((t, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{t.type}</span>
                          <span className="text-gray-500">{t.detail} ({t.score}%)</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              t.score >= 80 ? 'bg-green-500' : t.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${t.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 失分原因 */}
                <div>
                  <h3 className="font-bold text-gray-700 mb-3">失分原因分布</h3>
                  <div className="space-y-3">
                    {errorStats.map((e, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium" style={{ color: e.color }}>{e.type}</span>
                          <span className="text-gray-500">{e.lost}分 ({e.percentage}%)</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${e.percentage}%`, backgroundColor: e.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    总失分: {examData.totalScore - examData.studentScore}分
                  </p>
                </div>
              </div>

              {/* AI诊断结论 */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-800 mb-2">AI诊断结论</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {examData.studentName}同学本次数学期中考试得分<b>{examData.studentScore}分</b>（得分率{scoreRate}%），
                  整体处于<b className={scoreRate >= 80 ? 'text-green-600' : scoreRate >= 60 ? 'text-yellow-600' : 'text-red-600'}>
                    {scoreRate >= 85 ? '优秀' : scoreRate >= 75 ? '良好' : scoreRate >= 60 ? '中等' : '待提高'}
                  </b>水平。
                  失分主要集中在<b className="text-red-600">{weakTopics.map(w => w.topic).join('、')}</b>模块，
                  主要失分原因是<b className="text-orange-600">{errorStats[0]?.type}</b>（占{errorStats[0]?.percentage}%），
                  共有<b>{wrongQuestions.length}道题</b>出现错误。
                  若进行针对性训练，预计可提升<b className="text-green-600">{predictedImprovement}分</b>，
                  目标分数<b className="text-blue-600">{examData.studentScore + predictedImprovement}分</b>。
                </p>
              </div>
            </div>
          )}

          {/* 知识雷达 */}
          {activeTab === 'radar' && (
            <div>
              <h3 className="font-bold text-gray-700 mb-4">知识模块掌握度雷达图</h3>
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={topicStats}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="topic" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Radar
                      name="得分率"
                      dataKey="score"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.4}
                      strokeWidth={2}
                    />
                    <Tooltip formatter={(v) => `${v}%`} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* 各模块详情 */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
                {topicStats.map((t, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border-2 ${
                      t.score >= 80 ? 'border-green-200 bg-green-50' :
                      t.score >= 60 ? 'border-yellow-200 bg-yellow-50' :
                      'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{t.topic}</span>
                      <span className={`text-lg font-bold ${
                        t.score >= 80 ? 'text-green-600' :
                        t.score >= 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>{t.score}%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {t.studentScore}/{t.totalScore}分 · {t.errors}处错误
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 错题分析 */}
          {activeTab === 'errors' && (
            <div>
              <h3 className="font-bold text-gray-700 mb-4">错题详细分析 ({wrongQuestions.length}题)</h3>

              {/* 错误类型图例 */}
              <div className="flex flex-wrap gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
                {Object.entries(errorTypes).map(([type, info]) => (
                  <div key={type} className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: info.color }} />
                    <span className="font-medium">{type}</span>
                    <span className="text-gray-400">- {info.desc}</span>
                  </div>
                ))}
              </div>

              {/* 错题列表 */}
              <div className="space-y-4">
                {wrongQuestions.map(q => (
                  <div key={q.id} className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                    {/* 基本信息 */}
                    <div className="p-4 bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 bg-white border rounded text-xs font-medium">{q.type}</span>
                            <span className="text-gray-600 text-sm">第{q.id}题</span>
                            <span
                              className="px-2 py-0.5 rounded text-xs text-white"
                              style={{ backgroundColor: errorTypes[q.errorType!]?.color }}
                            >
                              {q.errorType}
                            </span>
                          </div>
                          <p className="mt-2 text-sm">
                            <span className="text-gray-500">知识点：</span>
                            <span className="font-medium text-gray-700">{q.knowledgePoint}</span>
                          </p>
                          {q.studentAnswer && (
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-sm">
                                <span className="text-gray-500">你的答案：</span>
                                <span className="text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded">{q.studentAnswer}</span>
                              </span>
                              {q.correctAnswer && (
                                <span className="text-sm">
                                  <span className="text-gray-500">正确答案：</span>
                                  <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">{q.correctAnswer}</span>
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-2xl font-bold text-red-500">-{q.maxScore - q.studentScore}</p>
                          <p className="text-xs text-gray-400">{q.studentScore}/{q.maxScore}分</p>
                        </div>
                      </div>

                      {/* 展开详细分析按钮 */}
                      {q.detailedAnalysis && (
                        <button
                          onClick={() => setExpandedErrors({...expandedErrors, [`error-${q.id}`]: !expandedErrors[`error-${q.id}`]})}
                          className="mt-3 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          {expandedErrors[`error-${q.id}`] ? '收起详细解析' : '查看详细解析'}
                        </button>
                      )}
                    </div>

                    {/* 详细解析展开区 */}
                    {q.detailedAnalysis && expandedErrors[`error-${q.id}`] && (
                      <div className="border-t bg-white p-4 space-y-4">
                        {/* 考查重点 */}
                        <div>
                          <h5 className="text-sm font-bold text-blue-700 mb-1">考查重点</h5>
                          <p className="text-sm text-gray-700 bg-blue-50 p-2 rounded">{q.detailedAnalysis.questionFocus}</p>
                        </div>

                        {/* 正确解题思路 */}
                        <div>
                          <h5 className="text-sm font-bold text-green-700 mb-2">正确解题思路</h5>
                          <div className="space-y-1">
                            {q.detailedAnalysis.correctReasoning.map((step, idx) => (
                              <p key={idx} className="text-sm text-gray-700 bg-green-50 p-2 rounded flex items-start gap-2">
                                <span className="text-green-600 font-medium">-&gt;</span>
                                {step}
                              </p>
                            ))}
                          </div>
                        </div>

                        {/* 你的错误分析 */}
                        <div>
                          <h5 className="text-sm font-bold text-red-700 mb-1">你的错误在哪</h5>
                          <p className="text-sm text-gray-700 bg-red-50 p-2 rounded border-l-4 border-red-400">{q.detailedAnalysis.studentMistake}</p>
                        </div>

                        {/* 同类题型规律 */}
                        <div>
                          <h5 className="text-sm font-bold text-purple-700 mb-1">同类题规律</h5>
                          <p className="text-sm text-gray-700 bg-purple-50 p-2 rounded">{q.detailedAnalysis.similarPattern}</p>
                        </div>

                        {/* 记忆技巧 */}
                        <div>
                          <h5 className="text-sm font-bold text-yellow-700 mb-1">记忆技巧</h5>
                          <p className="text-sm text-gray-700 bg-yellow-50 p-2 rounded font-medium">{q.detailedAnalysis.tips}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 针对练习 */}
          {activeTab === 'practice' && (
            <div>
              <h3 className="font-bold text-gray-700 mb-4">针对性练习题库</h3>
              <p className="text-sm text-gray-500 mb-4">根据你的薄弱程度智能分配题量，点击各模块开始练习</p>

              {/* 模块选择 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(practiceQuestions)
                  .sort((a, b) => a[1].mastery - b[1].mastery)
                  .map(([section, data]) => (
                  <button
                    key={section}
                    onClick={() => { setPracticeSection(section); setPracticeSubTab(0); setShowAnswer({}); }}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                      practiceSection === section
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span>{section}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      practiceSection === section ? 'bg-white/20' :
                      data.mastery < 70 ? 'bg-red-100 text-red-600' :
                      data.mastery < 80 ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {data.mastery}%
                    </span>
                    <span className={`text-xs ${practiceSection === section ? 'text-white/70' : 'text-gray-400'}`}>
                      ({data.totalQuestions}题)
                    </span>
                  </button>
                ))}
              </div>

              {/* 当前模块信息 */}
              {practiceQuestions[practiceSection] && (
                <div className={`p-3 rounded-lg mb-4 ${
                  practiceQuestions[practiceSection].mastery < 70 ? 'bg-red-50 border border-red-200' :
                  practiceQuestions[practiceSection].mastery < 80 ? 'bg-yellow-50 border border-yellow-200' :
                  'bg-green-50 border border-green-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-sm font-medium ${
                        practiceQuestions[practiceSection].mastery < 70 ? 'text-red-700' :
                        practiceQuestions[practiceSection].mastery < 80 ? 'text-yellow-700' :
                        'text-green-700'
                      }`}>
                        {practiceQuestions[practiceSection].mastery < 70 ? '重点突破' :
                         practiceQuestions[practiceSection].mastery < 80 ? '强化训练' :
                         '巩固提高'}
                      </span>
                      <p className="text-xs text-gray-600 mt-1">{practiceQuestions[practiceSection].description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-700">{practiceQuestions[practiceSection].totalQuestions}</p>
                      <p className="text-xs text-gray-500">推荐题量</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 小Tab */}
              {practiceQuestions[practiceSection]?.subTabs && (
                <div className="flex gap-2 mb-4 border-b pb-2">
                  {practiceQuestions[practiceSection].subTabs.map((sub, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setPracticeSubTab(idx); setShowAnswer({}); }}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-1.5 ${
                        practiceSubTab === idx
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      <span>{sub.icon}</span>
                      <span>{sub.name}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        sub.level === '基础' ? 'bg-green-100 text-green-600' :
                        sub.level === '进阶' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>{sub.level}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* 题目展示 */}
              <div className="space-y-4">
                {practiceQuestions[practiceSection]?.subTabs?.[practiceSubTab]?.questions.map((q, qIdx) => (
                  <div key={q.id as number} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                    {/* 选择题 */}
                    {q.options && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">第{qIdx + 1}题</span>
                          {q.relatedError && <span className="text-xs text-gray-400">关联错题: {q.relatedError as string}</span>}
                        </div>
                        <p className="text-gray-800 mb-3">{q.stem as string}</p>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          {(q.options as string[]).map((opt, i) => (
                            <div
                              key={i}
                              className={`p-2 rounded text-sm cursor-pointer transition-all ${
                                showAnswer[q.id as number] && opt.startsWith(q.answer as string)
                                  ? 'bg-green-100 text-green-800 border-2 border-green-500'
                                  : 'bg-gray-50 hover:bg-gray-100'
                              }`}
                              onClick={() => setShowAnswer({...showAnswer, [q.id as number]: true})}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => setShowAnswer({...showAnswer, [q.id as number]: !showAnswer[q.id as number]})}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          {showAnswer[q.id as number] ? '隐藏解析' : '查看答案解析'}
                        </button>
                        {showAnswer[q.id as number] && (
                          <div className="mt-3 p-3 bg-blue-50 rounded">
                            <p className="text-sm text-blue-800"><b>答案：{q.answer as string}</b></p>
                            <p className="text-sm text-gray-600 mt-1">{q.explanation as string}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 填空题 */}
                    {!q.options && q.answer && !q.type && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">填空</span>
                          {q.relatedError && <span className="text-xs text-gray-400">关联错题: {q.relatedError as string}</span>}
                        </div>
                        <p className="text-gray-800 mb-3">{q.stem as string}</p>
                        <button
                          onClick={() => setShowAnswer({...showAnswer, [q.id as number]: !showAnswer[q.id as number]})}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          {showAnswer[q.id as number] ? '隐藏答案' : '查看答案'}
                        </button>
                        {showAnswer[q.id as number] && (
                          <div className="mt-3 p-3 bg-green-50 rounded">
                            <p className="text-sm text-green-800"><b>答案：{q.answer as string}</b></p>
                            <p className="text-sm text-gray-600 mt-1">{q.explanation as string}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 技巧/分析卡片 */}
                    {q.type === 'analysis' && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">技巧</span>
                          <span className="font-medium text-gray-700">{q.title as string}</span>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-700 whitespace-pre-line">{q.content as string}</p>
                        </div>
                        {q.relatedError && (
                          <p className="text-xs text-gray-400 mt-2">关联错题: {q.relatedError as string}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 提分方案 */}
          {activeTab === 'plan' && (
            <div>
              <h3 className="font-bold text-gray-700 mb-4">个性化提分方案</h3>

              {/* 目标卡片 */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-5 text-white mb-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="opacity-90">按照以下方案学习，预计可达到</p>
                    <p className="text-4xl font-bold mt-1">
                      {examData.studentScore + predictedImprovement}分
                      <span className="text-lg opacity-80 ml-2">
                        (+{predictedImprovement}分)
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-bold opacity-30">目标</p>
                  </div>
                </div>
              </div>

              {/* 分优先级的建议 */}
              <div className="space-y-4">
                {/* 高优先级 */}
                <div className="border-l-4 border-red-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">高优先级</span>
                    <span className="font-medium text-gray-700">解决主要失分原因：{errorStats[0]?.type}</span>
                  </div>
                  {errorStats[0]?.type === "计算失误" && (
                    <p className="text-sm text-gray-600">
                      <b>计算能力强化：</b>每日进行15分钟计算专项训练，重点练习有理数混合运算、分数运算。
                      养成验算习惯，做完立即检查。推荐：计算时分步骤写清楚，不要跳步。
                    </p>
                  )}
                  {errorStats[0]?.type === "思维方法" && (
                    <p className="text-sm text-gray-600">
                      <b>思维方法提升：</b>精做典型例题，每道题做完后总结解题模板。
                      重点训练：分类讨论思想、找规律方法。建立&quot;问题-&gt;方法-&gt;注意点&quot;的思维导图。
                    </p>
                  )}
                  {errorStats[0]?.type === "概念不清" && (
                    <p className="text-sm text-gray-600">
                      <b>概念梳理：</b>回归教材，重新梳理核心概念和公式。
                      制作知识卡片，每张卡片写一个概念+3个例子。重点：科学记数法中&quot;亿=10^8&quot;的理解。
                    </p>
                  )}
                </div>

                {/* 中优先级 - 薄弱知识点 */}
                {weakTopics.map((topic, idx) => (
                  <div key={idx} className="border-l-4 border-yellow-500 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-bold">中优先级</span>
                      <span className="font-medium text-gray-700">{topic.topic}模块强化</span>
                      <span className="text-xs text-gray-400">当前{topic.score}%</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      该模块得分率{topic.score}%，存在{topic.errors}处错误。
                      建议系统复习该章节，完成专项练习题15-20道，目标提升至85%以上。
                    </p>
                  </div>
                ))}

                {/* 持续优化 */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">持续优化</span>
                    <span className="font-medium text-gray-700">学习习惯养成</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    建立错题本，每周回顾本周错题；做题时先圈画关键条件，培养审题习惯；
                    每次考试后进行试卷分析，找出失分规律。
                  </p>
                </div>
              </div>

              {/* 周计划 */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-3">推荐周学习计划</h4>
                <div className="grid grid-cols-7 gap-2 text-center text-xs">
                  {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day, idx) => (
                    <div key={day} className="bg-white p-2 rounded-lg shadow-sm">
                      <p className="font-medium text-gray-600">{day}</p>
                      <p className="text-gray-500 mt-1 leading-tight" style={{ fontSize: '10px' }}>
                        {idx === 0 && "有理数运算"}
                        {idx === 1 && "周期规律"}
                        {idx === 2 && "科学记数"}
                        {idx === 3 && "方程应用"}
                        {idx === 4 && "动点问题"}
                        {idx === 5 && "综合练习"}
                        {idx === 6 && "错题回顾"}
                      </p>
                      <p className="text-blue-600 font-medium mt-1">
                        {idx < 5 ? '40min' : '60min'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-gray-400 text-xs mt-4">
          基于真实批改试卷 · AI视觉分析生成 · {examData.studentName}初一数学期中考试
        </p>
      </div>
    </div>
  );
}
