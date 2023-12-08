# BIBLIOTECAFINAL
class EntidadeBiblio {
    constructor(titulo, autor, anoPublicacao, codigo) {
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.codigo = codigo;
        this.emprestado = false;
        this.usuarioEmprestimo = null;
    }

    devolver() {
        if (this.emprestado) {
            this.emprestado = false;
            console.log(${this.titulo} foi devolvido.);
        } else {
            console.log(${this.titulo} não está emprestado.);
        }
    }
    emprestar(usuario) {
        if (!this.emprestado) {
            this.emprestado = true;
            this.usuarioEmprestimo = usuario;
            console.log(${this.titulo} foi emprestado para ${usuario.nome}.);
        } else {
            console.log(${this.titulo} já está emprestado.);
        }
    }
}

class Livro extends EntidadeBiblio {
    constructor(titulo, autor, anoPublicacao, codigo, genero) {
        super(titulo, autor, anoPublicacao, codigo);
        this.genero = genero;
    }
    informacoes() {
        console.log(Livro: ${this.titulo}\nAutor: ${this.autor}\nAno de Publicação: ${this.anoPublicacao}\nGenero: ${this.genero});
    }
}
class Revista extends EntidadeBiblio {
    constructor(titulo, autor, anoPublicacao, codigo, edicao) {
        super(titulo, autor, anoPublicacao, codigo);
        this.edicao = edicao;
    }
    informacoes() {
        console.log(Revista: ${this.titulo}\nAutor: ${this.autor}\nAno de Publicação: ${this.anoPublicacao}\nEdição: ${this.edicao});
    }
}
class Usuario {
    constructor(nome, registroAcademico, dataNascimento) {
        this.nome = nome;
        this.registroAcademico = registroAcademico;
        this.dataNascimento = dataNascimento;
    }
}
class Biblio {
    constructor() {
        this.acervo = [];
        this.usuarios = [];
    }
    adicionarItem(item) {
        this.acervo.push(item);
    }
    listarAcervo() {
        console.log("Acervo da Biblioteca:");
        this.acervo.forEach(item => console.log(item.titulo));
    }

    addUser(usuario) {
        this.usuarios.push(usuario);
    }
    async carregarAcervoApi(apiUrl) {
        try {
            const response = await fetch(apiUrl);
            const acervo = await response.json();

            acervo.forEach(item => {
                if (item.tipo === 'livro') {
                    this.adicionarItem(new Livro(item.titulo, item.autor, item.anoPublicacao, item.codigo, item.genero));
                } else if (item.tipo === 'revista') {
                    this.adicionarItem(new Revista(item.titulo, item.autor, item.anoPublicacao, item.codigo, item.edicao));
                }
            });

            console.log("Acervo carregado da API.");
        } catch (error) {
            console.error("Erro ao carregar o acervo da API:", error);
        }
    }
    realizarOperacoes() {
        const usuarios = [
            new Usuario("Inacio", "12345", "1990-01-15"),
            new Usuario("Jason", "67890", "1985-07-20"),
            new Usuario("Myers", "54321", "1998-03-10"),
            new Usuario("Chuck", "98765", "2000-12-05"),
            new Usuario("Freddy", "13579", "1993-09-28")
        ];
        usuarios.forEach(usuario => this.addUser(usuario));
        this.carregarAcervoApi("https://api-biblioteca-mb6w.onrender.com/acervo");
        this.listarAcervo();
        this.emprestarItem("L001", "12345");
        this.emprestarItem("L001", "67890");
        this.devolverItem("L001");
        this.devolverItem("L001");
        this.listarAcervo();
    }
    emprestarItem(codigo, registroAcademico) {
        const item = this.acervo.find(item => item.codigo === codigo);
        if (item && !item.emprestado) {
            const usuario = this.usuarios.find(usuario => usuario.registroAcademico === registroAcademico);
            if (usuario) {
                item.emprestar(usuario);
            } else {
                console.log("Usuario nao foi encontrado.");
            }
        } else {
            console.log("Item nao encontrado ou ja esta emprestado.");
        }
    }
    devolverItem(codigo) {
        const item = this.acervo.find(item => item.codigo === codigo);
        if (item && item.emprestado) {
            item.devolver();
        } else {
            console.log("Item nao encontrado ou nao esta emprestado.");
        }
    }
}
const biblioteca = new Biblio();
biblioteca.realizarOperacoes();