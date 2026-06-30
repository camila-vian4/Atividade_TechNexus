package api.technexus.atv_technexus.service;

import api.technexus.atv_technexus.dto.FuncionarioRequestDTO;
import api.technexus.atv_technexus.dto.FuncionarioResponseDTO;
import api.technexus.atv_technexus.model.FuncionarioModel;
import api.technexus.atv_technexus.repository.FuncionarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Service
@Validated
public class FuncionarioService {
    @Autowired
    private FuncionarioRepository repository;

    public FuncionarioModel cadastrar(@Valid FuncionarioRequestDTO funcionarioDTO){
        if (repository.findByEmail(funcionarioDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Funcionário já cadastrado! ❌");
        }

        FuncionarioModel funcionario = new FuncionarioModel();

        funcionario.setNome(funcionarioDTO.getNome());
        funcionario.setTelefone(funcionarioDTO.getTelefone());
        funcionario.setEmail(funcionarioDTO.getEmail());
        funcionario.setCargo(funcionarioDTO.getCargo());
        funcionario.setSetor(funcionarioDTO.getSetor());

        return repository.save(funcionario);
    }

    public List<FuncionarioResponseDTO> listar(){
        return repository
                .findAll()
                .stream()
                .map(f -> new FuncionarioResponseDTO (f.getId(), f.getNome(), f.getTelefone(), f.getEmail(), f.getCargo(), f.getSetor()))
                .toList();
    }

    public FuncionarioModel atualizar(Long id, FuncionarioRequestDTO funcionarioDTO){
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("Funcionário não encontrado! 🔍");
        }

        FuncionarioModel novoFuncionario = new FuncionarioModel();
        novoFuncionario.setId(id);
        novoFuncionario.setNome(funcionarioDTO.getNome());
        novoFuncionario.setTelefone(funcionarioDTO.getTelefone());
        novoFuncionario.setEmail(funcionarioDTO.getEmail());
        novoFuncionario.setCargo(funcionarioDTO.getCargo());
        novoFuncionario.setSetor(funcionarioDTO.getSetor());

        return repository.save(novoFuncionario);
    }

    public void deletar(Long id){
        if(!repository.existsById(id)){
            throw new IllegalArgumentException("Funcionário não encontrado! 🔍");
        }

        repository.deleteById(id);
    }
}
