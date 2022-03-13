import { Request, Response } from 'express'
import { controller, post, get, del, use } from '../decorator'
import { BasicModelDefine, BasicModelClass } from '../model/BasicModel'
import { BarModelDefine, FooModelDefine } from '../model/OneToOneModel'
import { TeamModelDefine, PlayerModelDefine } from '../model/OneToManyModel'
import {
  MovieModelDefine,
  ActorModelDefine,
  MovieActorModelDefine
} from '../model/ManyToManyModel'
import { success, fail } from '../utils/CommonTypes'
import { Op, WhereOptions, Sequelize } from 'sequelize'
import dataSource from '../model/dataSource'

@controller('/api/sequelize')
class SequelizeController {
  // 删除单张表
  @get('/dropSingleTable')
  async dropSingleTable(req: Request, res: Response) {
    await BasicModelDefine.drop()
    res.json(success())
  }

  // 删除所有表，会自动处理关联关系
  @get('/dropAllTable')
  async dropAllTable(req: Request, res: Response) {
    await dataSource.drop()
    res.json(success())
  }

  @get('/basicInit')
  async basicInit(req: Request, res: Response) {
    // 要配置成支持 ES6 才能用这种方式
    // const basicCreate = await BasicModelClass.create({
    //   name: `basicCreate`,
    //   someUnique: `someUniquecreate`,
    //   uniqueOne: `uniqueOnecreate`,
    //   uniqueTwo: 1
    // })

    const basicCreate = await BasicModelDefine.create({
      name: `basicCreate`,
      someUnique: `someUniquecreate`,
      uniqueOne: `uniqueOnecreate`,
      uniqueTwo: 1
    })
    console.log('直接打印', basicCreate)
    console.log('toJSON 打印', basicCreate.toJSON())
    console.log('JSON.stringify 打印', JSON.stringify(basicCreate, null, 4))

    let basicArr = []
    for (let i = 1; i < 51; i++) {
      basicArr.push({
        name: `basic-${i}`,
        someUnique: `someUnique${i}`,
        uniqueOne: `uniqueOne${i}`,
        uniqueTwo: i
      })
    }
    // 默认情况下，bulkCreate 不会在要创建的每个对象上运行验证(而 create 可以做到). 为了使 bulkCreate 也运行这些验证，必须通过 validate: true 参数。但这会降低性能
    const result = await BasicModelDefine.bulkCreate(basicArr, {
      validate: true
    })
    res.json(success([basicCreate, ...result]))
  }

  @get('/basicUpdate')
  async basicUpdate(req: Request, res: Response) {
    const basicCreate = await BasicModelDefine.findOne({
      where: {
        name: 'basicCreate'
      }
    })
    if (basicCreate) {
      basicCreate.desc = 'test reload'
      console.log('basicCreate - reload 前', basicCreate.toJSON())
      // reload 从数据库中重新加载实例
      await basicCreate.reload()
      console.log('basicCreate - reload 后', basicCreate.toJSON())

      const random = Math.random()
      // basicCreate.desc = 'with update' + random
      // basicCreate.someUnique = 'with save' + random
      basicCreate.uniqueOne = 'with save' + random

      // 也可以通过 set 来同时在内存中更新多个属性，但这种方式在写代码时没有类型提示，代码写完后才会校验字段名和字段类型
      basicCreate.set({
        desc: 'with update set' + random,
        someUnique: 'with save set' + random
      })

      console.log('basicCreate - update 前', basicCreate.toJSON())
      // update 只会更新该实例上指定的字段
      await basicCreate.update({
        desc: 'with update' + random
      })
      const basicCreateUpdated = await BasicModelDefine.findOne({
        where: {
          name: 'basicCreate'
        }
      })
      console.log('basicCreate - update 后', basicCreate.toJSON())
      console.log(
        'basicCreateUpdated - update 后',
        basicCreateUpdated?.toJSON()
      )

      // save 可以指定要变更哪些字段
      await basicCreate.save({ fields: ['uniqueOne'] })

      const basicCreateSaveWithFields = await BasicModelDefine.findOne({
        where: {
          name: 'basicCreate'
        }
      })
      console.log(
        'basicCreateSaveWithFields - save 后',
        basicCreateSaveWithFields?.toJSON()
      )
      console.log('basicCreate - saveFields 后', basicCreate.toJSON())

      // save 不指定参数时会更新该实例上所有变更的字段
      await basicCreate.save()

      const basicCreateSaved = await BasicModelDefine.findOne({
        where: {
          name: 'basicCreate'
        }
      })
      console.log('basicCreateSaved - save 后', basicCreateSaved?.toJSON())
    }

    res.json(success(basicCreate))
  }

  @get('/basicDelete')
  async basicDelete(req: Request, res: Response) {
    const result = await BasicModelDefine.findOne({
      order: [['uniqueOne', 'ASC']]
    })
    console.log(
      'basicDelete 软删除前',
      result?.isSoftDeleted(),
      result?.toJSON()
    )
    await result?.destroy()
    // await result?.reload() // 软删除后，不能调用 reload，不然会报错
    console.log(
      'basicDelete 软删除后',
      result?.isSoftDeleted(),
      result?.toJSON()
    )
    // 恢复软删除的记录
    await result?.restore()
    console.log(
      'basicDelete 恢复软删除后',
      result?.isSoftDeleted(),
      result?.toJSON()
    )
    // 指定 force 为 true 来实现物理删除
    await result?.destroy({ force: true })
    res.json(success(result))
  }

  @get('/basicDeleteAll')
  async basicDeleteAll(req: Request, res: Response) {
    // 模型.destory 时必须指定 truncate 为 true 或 where 参数「哪怕是 {} 也行」，不然会报错
    // 删除指定表中的所有数据，如果模型配置了软删除，则默认是软删除
    const result = await BasicModelDefine.destroy({ where: {} })
    // 强制删除指定表中的所有数据
    // const result = await BasicModelDefine.destroy({ where: {}, force: true })
    // 强制删除指定表中的所有数据
    // const result = await BasicModelDefine.destroy({ truncate: true })
    res.json(success(result))
  }

  @get('/basicQuery')
  async basicQuery(req: Request, res: Response) {
    const result = await BasicModelDefine.findAll({
      /**
       * 仅当定义当前模型时指定了 paranoid: true 的情况下，查询时指定该字段才有意义
       * false 表示将已软删除和未软删除的数据都查询出来
       * true（默认值） 表示只查询未软删除的数据
       */
      // paranoid: false
    })
    res.json(success(result))
  }

  @get('/incrementOrDecrement')
  async incrementOrDecrement(req: Request, res: Response) {
    const basicCreate = await BasicModelDefine.findOne({
      where: {
        name: 'basicCreate'
      }
    })
    console.log('basicCreate - 自增前', basicCreate?.toJSON())
    await basicCreate?.increment('num1') // 默认自增 1
    await basicCreate?.increment('num1', { by: 2 }) // 改成自增 2

    await basicCreate?.increment(['num1', 'num2']) // 多个默认自增 1
    await basicCreate?.increment(['num1', 'num2'], { by: 2 }) // 多个自增 2
    await basicCreate?.increment({ num1: 3, num2: 4 }) // 多个自增不同
    console.log('basicCreate - 自增后', basicCreate?.toJSON())
    // increment 后内存中的值不会变化，需要用 reload 重新从数据中加载数据到内层中
    await basicCreate?.reload()
    console.log('basicCreate - 自增并 reload 后', basicCreate?.toJSON())

    res.json(success(basicCreate))
  }

  @get('/oneToOneInit')
  async oneToOneInit(req: Request, res: Response) {
    await dataSource.transaction(async t => {
      const foo = await FooModelDefine.create(
        { foo: 'foo1' },
        { transaction: t }
      )
      const bar = await BarModelDefine.create(
        { bar: 'bar1', fooId: foo.id },
        { transaction: t }
      )
      res.json(success({ foo, bar }))
    })
  }

  @get('/oneToOneQuery')
  async oneToOneQuery(req: Request, res: Response) {
    const foo = await FooModelDefine.findOne()
    const bar = await BarModelDefine.findOne()
    const allFoo = await FooModelDefine.findAll()
    const allBar = await BarModelDefine.findAll()
    res.json(success({ foo, bar, allFoo, allBar }))
  }

  @get('/oneToOneQueryInclude')
  async oneToOneQueryInclude(req: Request, res: Response) {
    const foo = await FooModelDefine.findOne({
      include: BarModelDefine // 必须定义 FooModelDefine.hasOne(BarModelDefine)
    })
    const bar = await BarModelDefine.findOne({
      include: FooModelDefine // 必须定义 BarModelDefine.belongsTo(FooModelDefine)
    })
    const allFoo = await FooModelDefine.findAll({
      include: BarModelDefine // 必须定义 FooModelDefine.hasOne(BarModelDefine)
    })
    const allBar = await BarModelDefine.findAll({
      include: FooModelDefine // 必须定义 BarModelDefine.belongsTo(FooModelDefine)
    })
    res.json(success({ foo, bar, allFoo, allBar }))
  }

  @get('/oneToManyInit')
  async oneToManyInit(req: Request, res: Response) {
    await dataSource.transaction(async t => {
      for (let i = 0; i < 5; i++) {
        const team = await TeamModelDefine.create({
          name: `team${i + 1}`
        })
        for (let j = 0; j < 10; j++) {
          const player = await PlayerModelDefine.create({
            name: `player-${i}-${j}`,
            teamId: team.id
          })
        }
      }
      res.json(success())
    })
  }

  @get('/oneToManyQuery')
  async oneToManyQuery(req: Request, res: Response) {
    const allTeam = await TeamModelDefine.findAll()

    if (allTeam && allTeam.length > 0) {
      const players = await allTeam[0].getPlayers!()
      console.log('懒加载 players', players) // 有值
      console.log('懒加载 allTeam[0].players', allTeam[0].players) // 无值
    }

    const allPlayer = await PlayerModelDefine.findAll()
    res.json(success({ allTeam, allPlayer }))
  }

  @get('/oneToManyQueryInclude')
  async oneToManyQueryInclude(req: Request, res: Response) {
    const allTeam = await TeamModelDefine.findAll({
      include: {
        model: PlayerModelDefine
        // as: 'playerList' // 如果设置关联的地方或 include 其中之一设置了 as，那么另一个地方也必须设置 as 为相同的值
      }
    })
    const allPlayer = await PlayerModelDefine.findAll({
      include: TeamModelDefine
    })
    res.json(success({ allTeam, allPlayer }))
  }

  @get('/manyToManyInit')
  async manyToManyInit(req: Request, res: Response) {
    await dataSource.transaction(async t => {
      let preMovie
      let preActor
      for (let i = 0; i < 5; i++) {
        const movie = await MovieModelDefine.create({
          name: `movie${i + 1}`
        })
        for (let j = 0; j < 10; j++) {
          const actor = await ActorModelDefine.create({
            name: `actor-${i}-${j}`
          })

          if (preMovie) {
            try {
              await MovieActorModelDefine.create({
                movieId: preMovie.id,
                actorId: actor.id
              })
            } catch (e) {
              console.log(
                '添加多对多失败 preMovie.id',
                preMovie.id,
                'actor.id',
                actor.id
              )
            }
          }
          if (preActor) {
            try {
              await MovieActorModelDefine.create({
                movieId: movie.id,
                actorId: preActor.id
              })
            } catch (e) {
              console.log(
                '添加多对多失败 movie.id',
                movie.id,
                'preActor.id',
                preActor.id
              )
            }
            preActor = undefined
          } else {
            preActor = actor
          }
        }
        preMovie = movie
      }
      res.json(success())
    })
  }

  @get('/manyToManyQuery')
  async manyToManyQuery(req: Request, res: Response) {
    const allMovie = await MovieModelDefine.findAll()
    const allActor = await ActorModelDefine.findAll()
    res.json(success({ allMovie, allActor }))
  }

  @get('/manyToManyQueryInclude')
  async manyToManyQueryInclude(req: Request, res: Response) {
    const allMovie = await MovieModelDefine.findAll({
      include: {
        model: ActorModelDefine
      }
    })
    const allActor = await ActorModelDefine.findAll({
      include: MovieModelDefine
    })
    res.json(success({ allMovie, allActor }))
  }
}
