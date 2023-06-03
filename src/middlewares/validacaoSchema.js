// import { usuarioSchema, loginSchema } from '../model/usuarioSchema.js';

// export function validacaoSchema(model){
//   return ( req,res,next)=>{
//     const { name, email, password, confirmPassword } = req.body

//     const senhaCriptografada = bcrypt.hashSync(password, 10);

//     const validacao = usuarioSchema.validate({ name, email, password, confirmPassword },{abroutEarly:false})
    
//     if (validacao.error) {
//         console.log(validacao.error.details)
//         return res.status(422).send("Preencha os dados corretamente!")
//     }   

//     try {
//         const cadastroDuplicado = await db.collection("usuarios").findOne({ email })
//         if (cadastroDuplicado) return res.status(409).send('Usuário já cadastrado!')
        
//         await db.collection("usuarios").insertOne({ name, email, password: senhaCriptografada })
//         res.status(201).send("Usuário cadastrado com sucesso!")

//     } catch (error) {
//         res.status(500).send(error.message)
//     }
//   }

// }
