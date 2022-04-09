import { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest', // 直接测试 ts 代码需要使用 ts-jest
  testEnvironment: 'node',
  // reporters: [
  //   'default',
  //   [
  //     './node_modules/jest-html-reporter', // 即使不使用该插件，加上 --coverage 参数也会生成一份测试覆盖率报告 coverage/Icov-report/index.html
  //     {
  //       pageTitle: 'Test Report',
  //       outputPath: './coverage/test-report.html',
  //     },
  //   ],
  // ],
  // coverageDirectory: 'coverage', // 测试覆盖率目录，默认就是 coverage
  // collectCoverage: true, // 生成覆盖率
  // collectCoverageFrom: ['src/**/!(*.d).ts'], // 忽略掉 .d.ts
}

export default config
