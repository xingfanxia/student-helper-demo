import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI 学情诊断系统
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            基于真实批改试卷的智能分析，精准定位薄弱环节，生成个性化提分方案
          </p>
        </div>

        {/* Demo Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* English Demo */}
          <Link href="/english" className="group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-indigo-200">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">
                    EN
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">英语学情诊断</h2>
                    <p className="text-white/80">高一期中考试分析</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">学生</p>
                    <p className="font-medium text-gray-800">沈睿祈</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">得分</p>
                    <p className="text-2xl font-bold text-indigo-600">100.5<span className="text-sm text-gray-400">/150</span></p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    阅读理解 95% - 表现优秀
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    读后续写 12% - 需重点突破
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    完形填空 40% - 强化训练
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">预计提分空间</span>
                  <span className="text-lg font-bold text-green-600">+25分</span>
                </div>
              </div>
              <div className="px-6 pb-6">
                <div className="bg-indigo-50 text-indigo-700 rounded-xl py-3 text-center font-medium group-hover:bg-indigo-100 transition-colors">
                  查看详细诊断报告
                </div>
              </div>
            </div>
          </Link>

          {/* Math Demo */}
          <Link href="/math" className="group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-blue-200">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">
                    数
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">数学学情诊断</h2>
                    <p className="text-white/80">初一期中考试分析</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">学生</p>
                    <p className="font-medium text-gray-800">雷烜</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">得分</p>
                    <p className="text-2xl font-bold text-blue-600">99<span className="text-sm text-gray-400">/120</span></p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    整式运算 88% - 掌握良好
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    有理数 75% - 需加强练习
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    数轴问题 60% - 重点突破
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">预计提分空间</span>
                  <span className="text-lg font-bold text-green-600">+15分</span>
                </div>
              </div>
              <div className="px-6 pb-6">
                <div className="bg-blue-50 text-blue-700 rounded-xl py-3 text-center font-medium group-hover:bg-blue-100 transition-colors">
                  查看详细诊断报告
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">系统功能</h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-xl mx-auto mb-4">
                图
              </div>
              <h4 className="font-bold text-gray-800 mb-2">诊断总览</h4>
              <p className="text-sm text-gray-600">各题型得分率、失分原因分布、AI诊断结论</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 text-xl mx-auto mb-4">
                雷
              </div>
              <h4 className="font-bold text-gray-800 mb-2">知识雷达</h4>
              <p className="text-sm text-gray-600">知识模块掌握度可视化，快速定位薄弱点</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 text-xl mx-auto mb-4">
                错
              </div>
              <h4 className="font-bold text-gray-800 mb-2">错题分析</h4>
              <p className="text-sm text-gray-600">详细解题思路、错误原因、同类题规律</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 text-xl mx-auto mb-4">
                练
              </div>
              <h4 className="font-bold text-gray-800 mb-2">针对练习</h4>
              <p className="text-sm text-gray-600">根据薄弱程度智能分配题量，分级训练</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            基于真实批改试卷 · AI视觉分析生成 · 个性化学情诊断
          </p>
        </div>
      </div>
    </div>
  );
}
